import mongoose, { SortOrder } from "mongoose";
import { sslService } from "../ssl/ssl.service";
import { Payment } from "./payment.model";
import { Booking } from "../booking/booking.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IPayment, IPaymentFilters } from "./payment.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { paymentSearchableFields } from "./payment.constant";
import { generateTransactionId } from "../../../utils/transIdGenarate";

const initPayment = async (data: any) => {
  // const transactionId = new mongoose.Types.ObjectId().toString();
  const transId = await generateTransactionId(10);
  const paymentSession = await sslService.initPayment({
    total_amount: data.amount,
    tran_id: transId,
    cus_name: data.userName,
    cus_email: data.userEmail,
    cus_add1: data.address,
    cus_phone: data.phone,
  });
  const paymentData = {
    amount: data.amount,
    email: data.userEmail,
    packageName: data.packageName,
    month: data.month,
    year: data.year,
    transactionId: transId,
  };
  const paymentExist = await Payment.findOne({
    email: data.userEmail,
    month: data.month,
    year: data.year,
    status: "success",
  });
  if (!paymentExist) {
    await Payment.create(paymentData);
    return {
      link: paymentSession.redirectGatewayURL,
    };
  } else {
    // throw new ApiError(httpStatus.BAD_REQUEST, "Already payment");
    return null;
  }
  // return paymentSession;
  // // .redirectGatewayURL
};

const paymentSuccess = async (transId: any) => {
  const result = await Payment.updateOne(
    { transactionId: transId },
    { $set: { status: "success" } }
  );
  return result;
};

const paymentByTransactionId = async (id: string) => {
  const result = await Payment.findOne({ transactionId: id });
  return result;
};

const paymentDelete = async (id: any) => {
  const result = await Payment.deleteOne({ transactionId: id });
  return result;
};

const webHook = async (payload: any) => {
  if (!payload || !payload?.status || payload?.status !== "VALID") {
    return {
      massage: "Invalid Payment!",
    };
  }
  const result = await sslService.validate(payload);
  console.log(result);
  if (result?.status !== "VALID") {
    return {
      massage: "Payment failed",
    };
  }

  const { tran_id } = result;
  await Payment.updateOne(
    { transactionId: tran_id },
    { $set: { status: "success" } }
  );
  return {
    message: "Payment success",
  };
};

const userAllPayment = async (email: string) => {
  const result = await Payment.find({ email: email, status: "success" });
  return result;
};

const paymentFilter = async (
  filters: IPaymentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPayment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: paymentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Payment.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Payment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const PaymentService = {
  initPayment,
  webHook,
  paymentSuccess,
  paymentByTransactionId,
  paymentDelete,
  userAllPayment,
  paymentFilter,
};
