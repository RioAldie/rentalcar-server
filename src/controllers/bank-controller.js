import bankService from '../service/bank-service.js';

const get = async (req, res, next) => {
  try {
    const result = await bankService.get();

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await bankService.add(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await bankService.edit(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bankService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  add,
  get,
  edit,
  remove,
};
