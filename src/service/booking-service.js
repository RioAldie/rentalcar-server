import { PrismaClient } from '@prisma/client';
import { validate } from '../validation/validate.js';
import { createNewBookValidation } from '../validation/booking-validation.js';

const prisma = new PrismaClient();

const getAll = async () => {
  const bookings = await prisma.booking.findMany();

  return bookings;
};

const createBooking = async (request) => {
  const booking_data = validate(createNewBookValidation, request);

  const newbooking = await prisma.booking.create({
    data: {
      userId: booking_data.userId,
      startDate: booking_data.startDate,
      endDate: booking_data.endDate,
      totalCost: booking_data.totalCost,
      status: booking_data.status,
      payment: booking_data.payment,
      carId: booking_data.carId,
    },
  });

  return newbooking;
};

export default { getAll, createBooking };
