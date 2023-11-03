import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

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
const paymentSuccess = async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  const result = await PaymentService.paymentSuccess(transactionId);
  if (result.modifiedCount > 0) {
    res.redirect(
      `${config.client_url}/user/booking/pay/success?transactionId=${transactionId}`
    );
  }
};

const paymentByTransactionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await PaymentService.paymentByTransactionId(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "payment retrived successfully",
    data: result,
  });
};

export const PaymentController = {
  initPayment,
  webHook,
  paymentSuccess,
  paymentByTransactionId,
};
