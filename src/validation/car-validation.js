import Joi from 'joi';

const createCarValidation = Joi.object({
  name: Joi.string().max(100).required(),
  image: Joi.string().max(100).required(),
  location: Joi.string().max(50).required(),
  brandId: Joi.string().max(100),
  categoryId: Joi.string().max(100),
  transmision: Joi.string().valid('AUTOMATIC', 'MANUAL').required(),
  seat: Joi.number(),
  speed: Joi.string(),
  cost: Joi.number(),
  color: Joi.string().max(50),
  width: Joi.number(),
  height: Joi.number(),
});
const editCarValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100),
  image: Joi.string().max(100),
  location: Joi.string().max(50),
  brandId: Joi.string().max(100),
  categoryId: Joi.string().max(100),
  transmision: Joi.string().valid('AUTOMATIC', 'MANUAL').required(),
  seat: Joi.number(),
  speed: Joi.string(),
  cost: Joi.number(),
  color: Joi.string().max(50),
  width: Joi.number(),
  height: Joi.number(),
});
const deleteCarValidation = Joi.string().max(100).required();

export {
  createCarValidation,
  editCarValidation,
  deleteCarValidation,
};
