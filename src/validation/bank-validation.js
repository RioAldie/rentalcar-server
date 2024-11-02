import Joi from 'joi';

const createBankValidation = Joi.object({
  bankId: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
  account_number: Joi.number().required(),
  account_name: Joi.string().max(100).required(),
  image: Joi.string().required(),
});

const editBankValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100),
  account_number: Joi.number(),
  account_name: Joi.string().max(100),
  image: Joi.string(),
});

const deleteBankValidation = Joi.string().max(100).required();

export { createBankValidation, editBankValidation, deleteBankValidation };
