import carService from '../service/car-service.js';

const get = async (req, res, next) => {
  try {
    const result = await carService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await carService.add(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

export default { get, add };
