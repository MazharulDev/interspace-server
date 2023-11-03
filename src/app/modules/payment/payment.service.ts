import mongoose from "mongoose";
import { sslService } from "../ssl/ssl.service";
import { Payment } from "./payment.model";
import { Booking } from "../booking/booking.model";

const initPayment = async (data: any) => {
  const transactionId = new mongoose.Types.ObjectId().toString();
  const paymentSession = await sslService.initPayment({
    total_amount: data.amount,
    tran_id: transactionId,
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
    transactionId: transactionId,
  };
  await Payment.create(paymentData);
  return paymentSession.redirectGatewayURL;
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

export const PaymentService = {
  initPayment,
  webHook,
  paymentSuccess,
  paymentByTransactionId,
};
