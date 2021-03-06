import * as express from "express";
import * as jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";
import * as cors from "cors";
import { HttpService } from "../src/app/services/httpService";
import { Collections } from "./collections";
import * as multer from "multer";
import { multerConfig } from "./multer-config";

export class Server {
  private port: string | number;
  private app: express.Application;
  private salt: string;
  private upload: express.RequestHandler;

  constructor() {
    this.port = process.env.PORT || 1334;
    this.app = express();
    this.salt = process.env.SALT || "a5027243-b177-513d-ab8e-0394a2042ff9";
    this.upload = multer(multerConfig).any();
  }

  run(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.use(cors());
    this.app.use(this.upload);
    this.app.use("/resources", express.static("uploads"));

    const path = require("path");
    const workingDir = path.join(__dirname, "..", "dist//modne-siostrzyczki")
    this.app.use(express.static(workingDir));

    MongoClient.connect(
      "mongodb://localhost:27017",
      (err, client) => {
        const db = client.db("modne-siostrzyczki");

        this.app.listen(this.port, () => {
          console.log(`app is running on port ${this.port}`);

          //HELLO
          this.app.get(
            "/app",
            (req: express.Request, res: express.Response) => {
              res.sendFile(workingDir + "/index.html");
            }
          );

          //LOGIN
          this.app.get(
            HttpService.loginRoute,
            (req: express.Request, res: express.Response) => {
              const userx = {
                email: req.query["email"],
                password: req.query["password"]
              };
              //check user
              db.collection(Collections.Users)
                .findOne(userx)
                .then(_user => {
                  if (_user) {
                    jwt.sign(userx, this.salt, (err, token) => {
                      res.status(200).json({ ..._user, token });
                    });
                  } else {
                    res.sendStatus(401);
                  }
                });
            }
          );

          //REGISTER
          this.app.post(
            HttpService.usersRoute,
            (req: express.Request, res: express.Response) => {
              //validate user?
              db.collection(Collections.Users)
                .insertOne(req.body)
                .then(user => {
                  jwt.sign(user, this.salt, (err, token) => {
                    res.status(200).json({ ...user, token });
                  });
                });
            }
          );

          //PRODUCTS
          this.app.get(
            HttpService.productsRoute,
            (req: express.Request, res: express.Response) => {
              db.collection(Collections.Products)
                .find({})
                .toArray()
                .then(products => {
                  res.status(200).json(products);
                });
            }
          );
          this.app.post(
            HttpService.productsRoute,
            this.verifyToken,
            (req: express.Request, res: express.Response) => {
              jwt.verify(req["token"], this.salt, (err, authData) => {
                if (err) {
                  res.sendStatus(403);
                } else {
                  db.collection(Collections.Products)
                  .insertOne(req.body)
                    //.replaceOne({ id: req.body.id }, req.body)
                    .then(() => {
                      res.sendStatus(201);
                    });
                }
              });
            }
          );
          this.app.delete(
            HttpService.productsRoute + '/:id',
            this.verifyToken,
            (req: express.Request, res: express.Response) => {
              jwt.verify(req["token"], this.salt, (err, authData) => {
                if (err) {
                  res.sendStatus(403);
                } else {
                  db.collection(Collections.Products)
                    .deleteOne({ "_id": req.params._id });
                  res.sendStatus(202);
                }
              });
            }
          );

          //UPLOAD
          //TODO: upload in folder with date?
          this.app.post(
            HttpService.uploadRoute,
            this.verifyToken,
            (req: express.Request, res: express.Response) => {
              //TODO: handle upload error here (e.g. file not accepted)
              res.status(200).json(req.files[0].filename)
            }
          );
        });
      }
    );
  }

  verifyToken(
    req: express.Request,
    res: express.Response,
    next: () => any
  ): boolean {
    const bearer: string | string[] = req.headers["authorization"];
    if (bearer) {
      const token = (<string>bearer).split(" ")[1];
      req["token"] = token;
      next();
    } else {
      res.sendStatus(403);
    }
    return false;
  }
}

const app = new Server();
app.run();
