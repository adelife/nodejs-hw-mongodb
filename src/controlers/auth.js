import * as AuthService from "../services/auth.js";


async function register(req, res) {
    const user= {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    const registedUser =  AuthService.registerUser(user);
    // console.log(createdUser);

    res.send({
        status: 201,
        message: "Successfully registered a user!",
        data: registedUser,
    });
};

async function login(req, res) {
    const {email, password} = req.body;

    await AuthService.loginUser(email, password);

    res.send("Successfully logged in an user!");
}

export {register, login};