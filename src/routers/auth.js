import express from "express";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import { register, login, logout, refresh } from "../controlers/auth.js";
import { registerSchema, loginShema } from "../validations/auth.js";
import { validateBody } from "../middlewares/validateBody.js";


const router = express.Router();
const jsonParser = express.json();

router.post('/auth/register', jsonParser, validateBody(registerSchema), ctrlWrapper(register));

router.post('/auth/login', jsonParser, validateBody(loginShema), ctrlWrapper(login));

router.post("/auth/logout", ctrlWrapper(logout));

router.post('/auth/refresh',ctrlWrapper(refresh));

export default router;