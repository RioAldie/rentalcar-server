import Joi from 'joi';

const createPaymentValidation = Joi.object({
  bookingId: Joi.string().max(100).required(),
  amount: Joi.number().required(),
  transaction_proof: Joi.string().max(100).required(),
  bank: Joi.string().max(100).required(),
  status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED'),
});

const changeStatusPaymentValidation = Joi.object({
  id: Joi.string().max(100).required(),
  status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED'),
});

export { createPaymentValidation, changeStatusPaymentValidation };
