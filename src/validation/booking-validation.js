import Joi from 'joi';

const createNewBookValidation = Joi.object({
  userId: Joi.string().max(100).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  totalCost: Joi.string().max(100).required(),
  status: Joi.string().valid(
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'COMPLETED'
  ),
  payment: Joi.string().max(100),
  Bank: Joi.string().max(100),
  carId: Joi.string().max(100).required(),
});

const editBookingValidation = Joi.object({
  id: Joi.string().required(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  totalCost: Joi.string().max(100),
});
const editStatusBookingValidation = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().valid(
    'PENDING',
    'CONFIRMED',
    'CANCELLED',
    'COMPLETED'
  ),
});

export {
  createNewBookValidation,
  editBookingValidation,
  editStatusBookingValidation,
};
