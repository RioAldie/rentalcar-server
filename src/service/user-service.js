import { PrismaClient } from '@prisma/client';
import {
  loginUserValidation,
  registerUserValidation,
} from '../validation/user-validation.js';
import { validate } from '../validation/validate.js';
import bcrypt from 'bcrypt';
import { ResponseError } from '../error/response-error.js';
import { tokenGenerated } from '../middleware/auth.js';

const get = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: 'USER',
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};
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
const registerAdmin = async (request) => {
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
      role: 'ADMIN',
    },
  });

  return newUser;
};

const login = async (request) => {
  const data = validate(loginUserValidation, request);

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

const loginAdmin = async (request) => {
  const data = validate(loginUserValidation, request);

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
  if (user.role !== 'ADMIN') {
    throw new ResponseError(402, 'not admin!');
  }
  const token = {
    id: user.id,
    role: 'admin',
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
  get,
  loginAdmin,
  registerAdmin,
};
