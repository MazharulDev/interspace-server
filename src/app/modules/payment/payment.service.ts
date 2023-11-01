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

export const PaymentService = {
  initPayment,
};
