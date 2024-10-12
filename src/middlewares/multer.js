import multer from 'multer';
import path from 'node:path';
// import crypto from "node:crypto";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //   const uniqueSuffix = crypto.randomUUID(); - рандомний генератор замість рандомної дати.
    callback(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
