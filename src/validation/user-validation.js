import Joi from 'joi';

const registerUserValidation = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  phone: Joi.string().max(100).optional(),
});

const loginUserValidation = Joi.object({
  password: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
});

export { registerUserValidation, loginUserValidation };
