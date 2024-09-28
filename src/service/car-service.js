import { PrismaClient } from '@prisma/client';
import { validate } from '../validation/validate.js';
import { createCarValidation } from '../validation/car-validation.js';

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

export default { get, add };
