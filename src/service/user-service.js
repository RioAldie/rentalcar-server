import { PrismaClient } from '@prisma/client';
import {
  loginUserValidation,
  registerUserValidation,
} from '../validation/user-validation.js';
import { validate } from '../validation/validate.js';
import bcrypt from 'bcrypt';
import { ResponseError } from '../error/response-error.js';
import { tokenGenerated } from '../middleware/auth.js';

const prisma = new PrismaClient();
const register = async (request) => {
  const { name, email, password, phone } = validate(
    registerUserValidation,
    request
  );

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    throw new ResponseError(402, 'email is already used');
  }

  const pass = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: pass,
      phone: phone,
    },
  });

  return newUser;
};

const login = async (request) => {
  const data = validate(loginUserValidation, request);

  console.log(data);
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new ResponseError(402, 'user with this email is not exist');
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(404, 'email or password is wrong!');
  }

  const token = {
    id: user.id,
    role: 'user',
    email: user.email,
  };

  const tokenCreated = tokenGenerated(token);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    token: tokenCreated,
  };
};
export default {
  register,
  login,
};
