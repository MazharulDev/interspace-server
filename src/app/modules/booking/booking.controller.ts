import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBooking } from "./booking.interface";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";
import pick from "../../../shared/pick";
import { bookingFilterableFields } from "./booking.constant";
import { paginationFields } from "../../../constants/pagination";

const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await BookingService.createService(userData);
  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You have booked successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookingFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookingService.getAllBooking(filters, paginationOptions);

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getBookingByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;

  const result = await BookingService.getBookingByEmail(email);

  sendResponse<IBooking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.deleteBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...bookingData } = req.body;
  const result = await BookingService.updateBookingStatus(id, bookingData);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

export const BookingController = {
  createService,
  getAllBooking,
  deleteBooking,
  updateBookingStatus,
  getBookingByEmail,
};
