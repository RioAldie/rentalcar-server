import { PrismaClient } from '@prisma/client';
import { validate } from '../validation/validate.js';
import {
  cancelBookingValidation,
  createNewBookValidation,
  deleteBookingValidation,
  editBookingValidation,
  editStatusBookingValidation,
} from '../validation/booking-validation.js';
import { ResponseError } from '../error/response-error.js';

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

const edit = async (request) => {
  const editBooking = validate(editBookingValidation, request);

  const existingBooking = await prisma.booking.findUnique({
    where: {
      id: editBooking.id,
    },
  });

  if (!existingBooking) {
    throw new ResponseError(404, 'Booking Not Found');
  }

  const updateBooking = await prisma.booking.update({
    where: {
      id: editBooking.id,
    },
    data: {
      startDate: editBooking.startDate || existingBooking.startDate,
      endDate: editBooking.endDate || existingBooking.endDate,
      totalCost: editBooking.totalCost || existingBooking.totalCost,
    },
  });

  return updateBooking;
};

const updateStatus = async (request) => {
  const editBooking = validate(editStatusBookingValidation, request);

  const existingBooking = await prisma.booking.findUnique({
    where: {
      id: editBooking.id,
    },
  });

  if (!existingBooking) {
    throw new ResponseError(404, 'Booking Not Found');
  }

  const updateBooking = await prisma.booking.update({
    where: {
      id: editBooking.id,
    },
    data: {
      status: editBooking.status,
    },
  });

  return updateBooking;
};
const cancel = async (request) => {
  const cancelBooking = validate(cancelBookingValidation, request);

  const existingBooking = await prisma.booking.findUnique({
    where: {
      id: cancelBooking.id,
    },
  });

  if (!existingBooking) {
    throw new ResponseError(404, 'Booking Not Found');
  }

  const updateBooking = await prisma.booking.update({
    where: {
      id: cancelBooking.id,
    },
    data: {
      status: 'CANCELLED',
    },
  });

  return updateBooking;
};

const remove = async (id) => {
  id = validate(deleteBookingValidation, id);

  const booking = await prisma.booking.delete({
    where: {
      id: id,
    },
  });

  if (!booking) {
    throw new ResponseError(404, 'booking is not found');
  }
  const message = 'booking deleted successfully!';
  return message;
};

export default {
  getAll,
  createBooking,
  edit,
  updateStatus,
  cancel,
  remove,
};
