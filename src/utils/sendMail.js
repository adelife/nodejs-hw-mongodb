import nodemailer from "nodemailer";
import { SMTP } from "../constants/index.js";

const transport = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD
  }
});

export function sendMail(options){
   return transport.sendMail(options);
};