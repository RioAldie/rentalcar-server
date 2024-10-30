import paymentService from '../service/payment-service.js';

const add = async (req, res, next) => {
  try {
    const result = await paymentService.add(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const result = await paymentService.updateStatus(req.body);

    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};
export default {
  add,
  update,
};
