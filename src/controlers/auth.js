import * as AuthService from "../services/auth.js";
// import { registerUser } from "../services/auth.js";



async function register(req, res) {
    const user= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    const registedUser = await AuthService.registerUser(user);


    res.status(201).send({
        status: 201,
        message: "Successfully registered a user!",
        data: registedUser,
});
};
async function login(req, res) {
    const {email, password} = req.body;

    const session = await AuthService.loginUser(email, password);
    console.log({session});


    res.cookie("refreshToken",session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200,
        message: "Successfully logged in an user!",
        data:{
            accessToken: session.accessToken
        }
    });
}

async function logout(req, res) {
  if(typeof req.cookies.sessionId === 'string'){
   await AuthService.logoutUser(req.cookies.sessionId);
};

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");


    res.status(204).end(); //  res.status(204).send();
    
};

async function refresh(req, res) {
const session = await AuthService.refreshUserSession(
    req.cookies.sessionId, 
    req.cookies.refreshToken);

    res.cookie("refreshToken",session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    });

    res.send({
        status: 200,
        message: "Successfully refreshed a session!",
        data:{
            accessToken: session.accessToken
        }
    });

}

export {register, login, logout, refresh};