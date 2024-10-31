import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

const transport = nodemailer.createTransport({
  host: env(SMTP.HOST),
  port: env(SMTP.PORT),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: env(SMTP.USER),
    pass: env(SMTP.PASSWORD),
  },
});

export function sendMail(options) {
  return transport.sendMail(options);
}
