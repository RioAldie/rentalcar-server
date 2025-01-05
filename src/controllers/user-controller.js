import userService from '../service/user-service.js';

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const registerAdmin = async (req, res, next) => {
  try {
    const result = await userService.registerAdmin(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const result = await userService.loginAdmin(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const get = async (req, res, next) => {
  try {
    const result = await userService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  get,
  loginAdmin,
  registerAdmin,
};
