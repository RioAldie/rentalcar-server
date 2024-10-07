import Joi from 'joi';

const createCarValidation = Joi.object({
  name: Joi.string().max(100).required(),
  image: Joi.string().max(100).required(),
  location: Joi.string().max(50).required(),
  brand: Joi.string().max(100),
  transmision: Joi.string().valid('AUTOMATIC', 'MANUAL').required(),
  seat: Joi.number(),
  costPerDay: Joi.number(),
  color: Joi.string().max(50),
  model: Joi.string().max(100),
  year: Joi.number(),
});
const editCarValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100),
  image: Joi.string().max(100),
  location: Joi.string().max(50),
  brand: Joi.string().max(100),
  transmision: Joi.string().valid('AUTOMATIC', 'MANUAL'),
  seat: Joi.number(),
  costPerDay: Joi.number(),
  color: Joi.string().max(50),
  model: Joi.string().max(100),
  year: Joi.number(),
  available: Joi.boolean(),
});
const deleteCarValidation = Joi.string().max(100).required();

export {
  createCarValidation,
  editCarValidation,
  deleteCarValidation,
};
