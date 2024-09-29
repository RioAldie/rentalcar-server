import express from 'express';
import carController from '../controllers/car-controller.js';

const publicRouter = new express.Router();

publicRouter.get('/', carController.get);
publicRouter.post('/car', carController.add);
publicRouter.patch('/car', carController.edit);
publicRouter.delete('/car/:id', carController.remove);
publicRouter.get('/cars', carController.filterByBrand);

export { publicRouter };
