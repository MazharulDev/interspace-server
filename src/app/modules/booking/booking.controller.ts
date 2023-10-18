import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IBooking } from "./booking.interface";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";

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

export const BookingController = {
  createService,
};
