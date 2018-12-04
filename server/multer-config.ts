import * as express from "express";
import multer = require("multer");
import { v4 as uuid } from "uuid";

const allowedMimeTypes = ["jpeg", "jpg", "png"];

export const multerConfig = {
  limits: {
    fieldSize: 1000000
  },
  fileFilter: (req: express.Request, file: Express.Multer.File, cb) => {
    const filename = file.originalname.split(".");
    if (allowedMimeTypes.includes(filename[filename.length - 1])) {
      cb(null, true);
    } else {
      console.log("file not accepted");
    }
  },
  storage: multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File, cb) => {
      cb(null, "./uploads");
    },
    filename: (req: express.Request, file: Express.Multer.File, cb) => {
      const filename = file.originalname.split(".");
      cb(null, `${uuid()}.${filename[filename.length - 1]}`);
    }
  })
};
