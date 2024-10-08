import createHttpError from "http-errors";
import { Session } from "../db/models/session.js";
import { User } from "../db/models/user.js"; 


export async function authenticate(req, res,next){
   const authHeader = req.get("Authorization");

   if (!authHeader) {
      return next(createHttpError(401, "Authorization header missing"));
  };

   if(typeof req.headers.authorization !== 'string'){
    return next(createHttpError(401, "Please provide Authorization header"));
   };

  const [bearer, accessToken] =  authHeader.split(" ", 2);

  if (bearer !== "Bearer" || typeof accessToken !== "string"){
    return next(createHttpError(401, "Auth header should be type of Bearer"));
  };

 const session = await Session.findOne({accessToken});

 if(session === null){
    return next(createHttpError(401, "Session not found"));
 };

 if(new Date()> new Date(session.accessTokenValidUntil)){
    return next(createHttpError(401, "Access token is expired"));
 };

 const user = await User.findOne({_id: session.userId});

 if( user === null){
    return next(createHttpError(401, "Session not found"));
 };

 req.user = user;

   next();
}