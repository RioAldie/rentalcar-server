import { PrismaClient } from '@prisma/client';
import { registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validate.js';

const prisma = new PrismaClient();
const register = async (request) => {
  const data = validate(registerUserValidation, request);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    },
  });

  return newUser;
};

export default {
  register,
};
