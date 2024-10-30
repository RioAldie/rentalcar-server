import { PrismaClient } from '@prisma/client';
import { ResponseError } from '../error/response-error.js';
import { createPaymentValidation } from '../validation/payment-validation.js';
import { validate } from '../validation/validate.js';

const prisma = new PrismaClient();

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

export default { add };
