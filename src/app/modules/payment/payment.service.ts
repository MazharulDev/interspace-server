import { sslService } from "../ssl/ssl.service";
import { Payment } from "./payment.model";

const initPayment = async (data: any) => {
  const paymentSession = await sslService.initPayment({
    total_amount: data.amount,
    tran_id: data.transactionId,
    cus_name: data.userName,
    cus_email: data.userEmail,
    cus_add1: data.address,
    cus_phone: data.phone,
  });
  const paymentData = {
    amount: data.amount,
    email: data.userEmail,
    transactionId: data.transactionId,
  };
  await Payment.create(paymentData);
  return paymentSession.redirectGatewayURL;
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
  console.log(tran_id);
  await Payment.updateOne(
    { transactionId: tran_id },
    { $set: { status: "success" } }
  );
  return {
    message:"Payment success"
  }
};

export const PaymentService = {
  initPayment,
  webHook,
};
