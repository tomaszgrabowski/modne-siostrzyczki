import * as express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

export class Server {
  private port: string | number;
  private app: express.Application;
  private router: express.Router;
  private salt: string;

  constructor() {
    this.port = process.env.PORT || 1334;
    this.app = express();
    this.router = express.Router();
    this.salt = process.env.SALT || "a5027243-b177-513d-ab8e-0394a2042ff9";
  }

  run(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    MongoClient.connect(
      "mongodb://localhost:27017",
      (err, client) => {
        const db = client.db("modne-siostrzyczki");

        this.app.listen(this.port, () => {
          console.log(`app is running on port ${this.port}`);

          this.app.get(
            "/hello",
            this.verifyToken,
            (req: express.Request, res: express.Response) => {
              jwt.verify(req["token"], this.salt, (err, authData) => {
                if (err) {
                  res.sendStatus(403);
                } else {
                  res.status(200).json({ message: `hello` });
                }
              });
            }
          );

          this.app.post(
            "/login",
            (req: express.Request, res: express.Response) => {
              const userx = req.body;
              //check user
              db.collection('users').findOne(userx).then(_user=>res.status(200).json( _user ));

              jwt.sign(userx, this.salt, (err, token) => {
                res.status(200).json({ token });
              });
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
