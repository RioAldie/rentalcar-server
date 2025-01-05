import { PrismaClient } from '@prisma/client';
import { ResponseError } from '../error/response-error.js';
import {
  changeStatusPaymentValidation,
  createPaymentValidation,
} from '../validation/payment-validation.js';
import { validate } from '../validation/validate.js';

const prisma = new PrismaClient();

const get = async () => {
  const payments = await prisma.payment.findMany();

  return payments;
};
const add = async (request) => {
  const payment = validate(createPaymentValidation, request);

  const newpayment = await prisma.payment.create({
    data: {
      bookingId: payment.bookingId,
      amount: payment.amount,
      transaction_proof: payment.transaction_proof,
      bank: payment.bank,
    },
  });

  return newpayment;
};

const updateStatus = async (request) => {
  const status = validate(changeStatusPaymentValidation, request);

  const existingPayment = await prisma.payment.findUnique({
    where: {
      id: status.id,
    },
  });

  if (!existingPayment) {
    throw new ResponseError(404, 'Booking Not Found');
  }

  const updatePayment = await prisma.payment.update({
    where: {
      id: status.id,
    },
    data: {
      status: status.status,
    },
  });

  return updatePayment;
};

export default { add, updateStatus, get };
