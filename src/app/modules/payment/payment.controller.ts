import { NextFunction, Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";
import pick from "../../../shared/pick";
import catchAsync from "../../../shared/catchAsync";
import { paymentFilterableFields } from "./payment.constant";
import { paginationFields } from "../../../constants/pagination";
import { IPayment } from "./payment.interface";

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
const paymentDelete = async (req: Request, res: Response) => {
  const { transactionId } = req.query;
  const result = await PaymentService.paymentDelete(transactionId);
  if (result.deletedCount) {
    res.redirect(
      `${config.client_url}/user/booking/pay/fail?transactionId=${transactionId}`
    );
  }
};
const userAllPayment = async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await PaymentService.userAllPayment(email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user payments retrived successfully",
    data: result,
  });
};

const paymentFilter = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paymentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await PaymentService.paymentFilter(filters, paginationOptions);

  sendResponse<IPayment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const PaymentController = {
  initPayment,
  webHook,
  paymentSuccess,
  paymentByTransactionId,
  paymentDelete,
  userAllPayment,
  paymentFilter,
};
