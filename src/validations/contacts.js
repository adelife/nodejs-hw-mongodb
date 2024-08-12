import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Email is not valid',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  phoneNumber: Joi.number().required(),
  isFavourite: Joi.boolean(),
});