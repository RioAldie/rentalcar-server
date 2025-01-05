import { PrismaClient } from '@prisma/client';
import { validate } from '../validation/validate.js';
import {
  createCarValidation,
  deleteCarValidation,
  editCarValidation,
} from '../validation/car-validation.js';
import { ResponseError } from '../error/response-error.js';

const prisma = new PrismaClient();
const get = async () => {
  const cars = await prisma.car.findMany();

  return cars;
};

const getOne = async (id) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
  });
  if (!car) {
    throw new ResponseError(404, 'car is not found');
  }
  return car;
};

const addMany = async (request) => {
  const cars = request;

  const result = await prisma.car.createMany({
    data: cars,
    skipDuplicates: true,
  });

  console.log(`${result.count} cars added successfully!`);
  return result;
};

const add = async (request) => {
  const car = validate(createCarValidation, request);

  const newcar = await prisma.car.create({
    data: {
      name: car.name,
      image: car.image,
      location: car.location,
      brand: car.brand,
      transmision: car.transmision, // This is already validated by Joi
      seat: car.seat,
      costPerDay: car.costPerDay,
      color: car.color,
      model: car.model,
      year: car.year,
    },
  });

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
      brand: editCar.brandId || existingCar.brand,
      transmision: editCar.transmision || existingCar.transmision,
      seat: editCar.seat || existingCar.seat,
      costPerDay: editCar.cost || existingCar.cost,
      color: editCar.color || existingCar.color,
      model: editCar.model || existingCar.model,
      year: editCar.year || existingCar.year,
      available: editCar.available || existingCar.available,
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
  const message = 'car deleted successfully!';
  return message;
};

const filterByBrand = async (brand) => {
  const cars = await prisma.car.findMany({
    where: {
      brand: brand,
    },
    select: {
      name: true,
      location: true,
      brand: true,
      color: true,
      image: true,
      id: true,
    },
  });

  return cars;
};

const search = async (request) => {
  const { name, brand, model, year, priceRange } = request.query;
  const cars = await prisma.car.findMany({
    where: {
      AND: [
        name ? { name: { contains: name, mode: 'insensitive' } } : {},
        brand
          ? { brand: { contains: brand, mode: 'insensitive' } }
          : {},
        model
          ? { model: { contains: model, mode: 'insensitive' } }
          : {},
        year ? { year: parseInt(year) } : {},
        priceRange
          ? {
              costPerDay: {
                gte: parseInt(priceRange.split('-')[0]),
                lte: parseInt(priceRange.split('-')[1]),
              },
            }
          : {},
      ],
    },
  });
  return cars;
};
export default {
  get,
  add,
  edit,
  remove,
  filterByBrand,
  addMany,
  getOne,
  search,
};
