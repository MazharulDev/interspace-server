import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createService = async (bookInfo: IBooking): Promise<IBooking | null> => {
  const existBooking = await Booking.findOne({ email: bookInfo.email });
  if (existBooking) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You already booked our connection"
    );
  }
  const result = await Booking.create(bookInfo);
  return result;
};

export const BookingService = {
  createService,
};
