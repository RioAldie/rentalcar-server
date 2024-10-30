import carService from '../service/car-service.js';

const get = async (req, res, next) => {
  try {
    const result = await carService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await carService.getOne(id);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
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

const edit = async (req, res, next) => {
  try {
    const result = await carService.edit(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await carService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const filterByBrand = async (req, res, next) => {
  try {
    const result = await carService.filterByBrand(req);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error342);
  }
};

const addMany = async (req, res, next) => {
  try {
    const result = await carService.addMany(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  get,
  add,
  edit,
  remove,
  filterByBrand,
  addMany,
  getOne,
};