import *as bcrypt from "bcrypt";
import crypto from "node:crypto";

import { User } from "../db/models/user.js";
import createHttpError from "http-errors";

import { Session } from "../db/models/session.js";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../constants/index.js";


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
}

export {registerUser, loginUser, logoutUser, refreshUserSession};