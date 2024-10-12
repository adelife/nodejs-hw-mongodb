import *as bcrypt from "bcrypt";
import *as fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import jsonwebtoken from "jsonwebtoken";
import Handlebars from "handlebars";

import { User } from "../db/models/user.js";
import createHttpError from "http-errors";

import { sendMail } from "../utils/sendMail.js";

import { Session } from "../db/models/session.js";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, SMTP, TEMPLATE_DIR} from "../constants/index.js";
// import { link } from "joi";


async function registerUser(user) {
    const maybeUser = await User.findOne({email: user.email});

    if(maybeUser !== null){
        throw createHttpError(409, "Email in use");
    };

    user.password = await bcrypt.hash(user.password, 10);

    // console.log(user);

  return   User.create(user);
}; 

async function loginUser(email, password) {
  const maybeUser= await User.findOne({email});

    if(maybeUser === null){
throw createHttpError(404, "User not found");
    }
  
    const isMatch = await bcrypt.compare(password, maybeUser.password);

    if(isMatch === false){
      throw createHttpError(401,"Unauthorize" );
    };

    await Session.deleteOne({userId: maybeUser._id});

    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken= crypto.randomBytes(30).toString('base64');

    return Session.create({
      userId: maybeUser._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
      refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });
};

async function logoutUser(sessionId) {
  return Session.deleteOne({_id: sessionId});
};


async function refreshUserSession(sessionId, refreshToken) {
  const session = await Session.findOne({_id: sessionId, refreshToken});

  if (session === null){
    throw createHttpError(401, "Session not found");
  };

  if (new Date() > new Date(session.refreshTokenValidUntil)){
    throw createHttpError(401, "Session token expired");
  };

  await Session.deleteOne({_id: session._id});

  return Session.create({
    userId: session.userId,
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });
};

async function requestResetEmail(email) {
  const user = await User.findOne({email});

  if(user === null){
    throw createHttpError(404, "User not found");
  };

  const resetToken = jsonwebtoken.sign({
  sub: user._id,
  email: user.email,
}, process.env.JWT_SECRET,{
  expiresIn: "5m"
}
);

const templateFile =  path.join(TEMPLATE_DIR, "reset-password-email.html");

const templateSource =  await fs.readFile(templateFile, {encoding: "utf-8"});

const template = Handlebars.compile(templateSource);

const html = template({
  name: user.name,
  link: `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`
});


  await sendMail({
    from: SMTP.FROM, // sender address
    to: email, // list of receivers
    subject: "Reset your pass", // Subject line
    html

  });
};

async function   resetPassword(password, token) {
try{
  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    
    console.log(decoded);

    const user = await User.findOne({_id: decoded.sub, email: decoded.email});

    if (!user){
      throw createHttpError(404, 'User not found');
    };

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.updateOne({_id: user._id}, { password: hashedPassword });
  }catch(error){
    if(error.name === "TokenExpiredError" || error.name === "JsonWebTokenError"){
      throw  createHttpError(401, 'Token is expired or invalid.');
    }
throw error;
  };


};
export {registerUser, loginUser, logoutUser, refreshUserSession, requestResetEmail, resetPassword};