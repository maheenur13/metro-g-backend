import { Bookings } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IBookingPayload } from "./booking.interface";

const createBooking = async (data: IBookingPayload): Promise<Bookings> => {

  
    return await prisma.bookings.create({
      data,
    });
  };

  export const bookingService = {
    createBooking
  }