import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().messages({
    'string.email': 'Email is not valid',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  phoneNumber: Joi.number().required(),
  isFavourite: Joi.boolean(),
});

export const updatecontactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().messages({
    'string.email': 'Email is not valid',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal'),
  phoneNumber: Joi.number(),
  isFavourite: Joi.boolean(),
});