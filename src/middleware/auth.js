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
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        errors: 'Unauthorized',
      });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, verified) => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' });
      }
      // If token is verified, continue to the next middleware or route handler
      next();
    });
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
