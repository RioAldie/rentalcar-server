import { PrismaClient } from '@prisma/client';
import { validate } from '../validation/validate.js';
import {
  createCarValidation,
  deleteCarValidation,
  editCarValidation,
} from '../validation/car-validation.js';

const prisma = new PrismaClient();
const get = async () => {
  const cars = await prisma.car.findMany();

  return cars;
};

const add = async (request) => {
  const car = validate(createCarValidation, request);

  const brandExists = await prisma.brand.findUnique({
    where: { id: car.brandId },
  });

  const categoryExists = await prisma.category.findUnique({
    where: { id: car.categoryId },
  });

  if (!brandExists || !categoryExists) {
    throw new Error('Brand or Category does not exist.');
  }
  const newcar = await prisma.car.create({
    data: {
      name: car.name,
      image: car.image,
      location: car.location,
      brandId: car.brandId,
      categoryId: car.categoryId,
      transmision: car.transmision, // This is already validated by Joi
      speed: car.speed,
      seat: car.seat,
      cost: car.cost,
      color: car.color,
      width: car.width,
      height: car.height,
    },
  });

  console.log(car);
  return newcar;
};

const edit = async (request) => {
  const editCar = validate(editCarValidation, request);

  const existingCar = await prisma.car.findUnique({
    where: {
      id: editCar.id,
    },
  });

  if (!existingCar) {
    throw new ResponseError(404, 'car is not found');
  }

  const updateCar = await prisma.car.update({
    where: {
      id: editCar.id,
    },
    data: {
      name: editCar.name || existingCar.name,
      image: editCar.image || existingCar.image,
      location: editCar.location || existingCar.location,
      brandId: editCar.brandId || existingCar.brandId,
      categoryId: editCar.categoryId || existingCar.categoryId,
      transmision: editCar.transmision || existingCar.transmision,
      speed: editCar.speed || existingCar.speed,
      seat: editCar.seat || existingCar.seat,
      cost: editCar.cost || existingCar.cost,
      color: editCar.color || existingCar.color,
      width: editCar.width || existingCar.width,
      height: editCar.height || existingCar.height,
    },
  });

  return updateCar;
};

const remove = async (id) => {
  id = validate(deleteCarValidation, id);

  const car = await prisma.car.delete({
    where: {
      id: id,
    },
  });

  if (!car) {
    throw new ResponseError(404, 'car is not found');
  }

  return car;
};

const filterByBrand = async (brand) => {
  const cars = await prisma.car.findMany({
    where: {
      brandId: brand,
    },
    select: {
      name: true,
      location: true,
      brand: true,
      color: true,
    },
  });

  return cars;
};
export default { get, add, edit, remove, filterByBrand };
