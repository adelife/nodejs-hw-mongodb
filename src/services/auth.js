import *as bcrypt from "bcrypt";

import { User } from "../db/models/user.js";
import createHttpError from "http-errors";


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
};

export {registerUser, loginUser};