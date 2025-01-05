import express from 'express';
import carController from '../controllers/car-controller.js';
import userController from '../controllers/user-controller.js';
import { tokenVerified } from '../middleware/auth.js';
import bookingController from '../controllers/booking-controller.js';
import paymentController from '../controllers/payment-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/', carController.get);
publicRouter.post('/car', carController.add);
publicRouter.patch('/car', carController.edit);
publicRouter.delete('/car/:id', carController.remove);

publicRouter.get('/cars/:brand', carController.search);
publicRouter.post('/cars', carController.addMany);
publicRouter.get('/car/:id', [tokenVerified], carController.getOne);

publicRouter.get('/users', [tokenVerified], userController.get);
publicRouter.post('/signup', userController.register);
publicRouter.post('/signin', userController.login);
publicRouter.post('/admin/signin', userController.loginAdmin);
publicRouter.post('/admin/signup', userController.registerAdmin);

publicRouter.post(
  '/booking',
  [tokenVerified],
  bookingController.create
);
publicRouter.get(
  '/booking',
  [tokenVerified],
  bookingController.getAll
);
publicRouter.patch(
  '/booking',
  [tokenVerified],
  bookingController.edit
);
publicRouter.patch(
  '/booking/status',
  [tokenVerified],
  bookingController.update
);
publicRouter.patch(
  '/booking/cancel',
  [tokenVerified],
  bookingController.cancel
);
publicRouter.delete(
  '/booking/:id',
  [tokenVerified],
  bookingController.remove
);
publicRouter.get('/payment', [paymentController.get]);
publicRouter.post('/payment', [tokenVerified], paymentController.add);

publicRouter.post(
  '/payment/status',
  [tokenVerified],
  paymentController.update
);

export { publicRouter };
