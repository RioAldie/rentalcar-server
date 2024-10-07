import express from 'express';
import carController from '../controllers/car-controller.js';
import userController from '../controllers/user-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/', carController.get);
publicRouter.post('/car', carController.add);
publicRouter.patch('/car', carController.edit);
publicRouter.delete('/car/:id', carController.remove);
publicRouter.get('/cars', carController.filterByBrand);
publicRouter.post('/cars', carController.addMany);
publicRouter.get('/car/:id', carController.getOne);

publicRouter.post('/signup', userController.register);

export { publicRouter };
