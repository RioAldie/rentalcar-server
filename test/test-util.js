import {prismaClient} from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            name: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            user_id: "test123",
            name: "test",
            email: "test@example.com",
            password: await bcrypt.hash("secret", 10),
            phone: 12345678910,
            role: "ADMIN"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            name: "test"
        }
    });
}

export const removeAllTestCar = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            name: 'test'
        }
    });
}

export const createTestCar = async () => {
    await prismaClient.car.create({
        data: {
            car_id: "test123",
            name: "test",
            brand: "test",
            model: "test",
            year: 1999,
            color: "blue",
            image: "image.jpg",
            transmision: "AUTOMATIC",
            seat: 4,
            costPerDay: 10.000,
            location: "Nganjuk",
            available: true,
            createdAt: "2024-10-06T09:10:05.411Z",
            updatedAt: "2024-10-06T09:10:06.411Z"
        }
    })
}

export const getTestCar = async () => {
    return prismaClient.car.findFirst({
        where: {
            name: 'test'
        }
    })
}

export const removeAllTestBooking = async () => {
    await prismaClient.booking.deleteMany({
        where: {
            user: {
                userId: "test123"
            },
            car: {
                carId: "test123"
            }
        }
    });
}

export const createTestBooking = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            startDate: "2024-10-06T09:10:07.411Z",
            endDate: "2024-10-06T09:10:08.411Z",
            totalCost: 10.000,
            status: "CONFIRMED",
            createdAt: "2024-10-06T09:10:09.411Z",
            updatedAt: "2024-10-06T09:10:10.411Z"
        }
    })
}

export const getTestBooking = async () => {
    return prismaClient.booking.findFirst({
        where: {
            user: {
                userId: "test123"
            },
            car: {
                carId: "test123"
            }
        }
    })
}

export const removeAllTestPayment = async () => {
    await prismaClient.payment.deleteMany({
        where: {
            booking: {
                bookingId: "test123"
            }
        }
    });
}

export const createTestPayment = async () => {
    const contact = await getTestContact();
    await prismaClient.payment.create({
        data: {
            payment_id: payment.id,
            amount: 10.000,
            paymentDate: "2024-10-06T09:10:08.411Z",
            status: "CONFIRMED",
            transaction_proof: "accept",
            bank: "test"
        }
    })
}

export const getTestPayment = async () => {
    return prismaClient.payment.findFirst({
        where: {
            booking: {
                bookingId: "test123"
            }
        }
    })
}

export const removeAllTestBank = async () => {
    await prismaClient.bank.deleteMany({
        where: {
            name: "test"
        }
    });
}

export const createTestBank = async () => {
    const contact = await getTestContact();
    await prismaClient.bank.create({
        data: {
            bank_id: bank.id,
            name: "test",
            accountNum: 1234567890,
            accountName: "test",
            image: "test.jpg",
        }
    })
}

export const getTestBank = async () => {
    return prismaClient.bank.findUnique({
        where: {
            name: "test"
        }
    });
}