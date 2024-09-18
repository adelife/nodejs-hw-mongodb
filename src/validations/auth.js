import Joi from "joi";

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const loginShema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});