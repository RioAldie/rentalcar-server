import { PrismaClient } from '@prisma/client';
import { ResponseError } from '../error/response-error.js';
import {
  createBankValidation,
  editBankValidation,
  deleteBankValidation,
} from '../validation/bank-validation.js';
import { validate } from '../validation/validate.js';

const prisma = new PrismaClient();

const getAll = async () => {
  const banks = await prisma.bank.findMany();

  return banks;
};

const add = async (request) => {
  const bank = validate(createBankValidation, request);

  const newbank = await prisma.payment.create({
    data: {
      name: bank.name,
      account_number: bank.account_number,
      account_name: bank.account_name,
      image: bank.image,
    },
  });

  return newbank;
};

const edit = async (request) => {
  const editBank = validate(editBankValidation, request);

  const existingBank = await prisma.bank.findUnique({
    where: {
      id: editBank.id,
    },
  });

  if (!existingBank) {
    throw new ResponseError(404, 'Bank Not Found');
  }

  const updateBank = await prisma.bank.update({
    where: {
      id: editBank.id,
    },
    data: {
      name: editBank.name || existingBank.name,
      account_number: editBank.account_number || existingBank.account_number,
      account_name: editBank.account_name || existingBank.account_name,
      image: editBank.image || existingBank.image,
    },
  });

  return updateBank;
};

const remove = async (id) => {
  id = validate(deleteBankValidation, id);

  const bank = await prisma.bank.delete({
    where: {
      id: id,
    },
  });

  if (!bank) {
    throw new ResponseError(404, 'bank is not found');
  }
  const message = 'bank deleted successfully!';
  return message;
};

export default {
  getAll,
  add,
  edit,
  remove,
};
