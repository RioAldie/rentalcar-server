import bookingService from '../service/booking-service.js';

const create = async (req, res, next) => {
  try {
    const result = await bookingService.createBooking(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await bookingService.getAll();
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await bookingService.edit(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await bookingService.updateStatus(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const cancel = async (req, res, next) => {
  try {
    const result = await bookingService.cancel(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await bookingService.remove(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getAll, edit, update, cancel, remove };
