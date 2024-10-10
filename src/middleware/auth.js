import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '/.env' });

const { SECRET_KEY } = process.env;

export const tokenGenerated = (data) => {
  const token = jwt.sign({ data }, SECRET_KEY, {
    expiresIn: '7d',
  });

  return token;
};

export const tokenVerified = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
    if (verified) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const tokenReturned = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);

    if (verified.data.role === 'user') {
      next();
    } else {
      return res
        .status(401)
        .json({ message: 'Unauthorized Forbidden' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
