import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const initPayment = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentService.initPayment(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "payment init successfully",
    data: result,
  });
};
const webHook = async (req: Request, res: Response, next: NextFunction) => {
  const result = await PaymentService.webHook(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "payment verified successfully",
    data: result,
  });
};

export const PaymentController = {
  initPayment,
  webHook,
};
