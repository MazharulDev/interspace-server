import axios from "axios";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_pass,
      total_amount: payload.total_amount,
      currency: "BDT",
      tran_id: payload.tran_id,
      success_url: `${config.server_url}/payment/success?transactionId=${payload.tran_id}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Bill Pay",
      product_category: "Payment",
      product_profile: "User",
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add1: payload.cus_add1,
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: payload.cus_phone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };

    const response = await axios({
      method: "post",
      url: config.ssl.sslPaymentUrl,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "payment failed");
  }
};

const validate = async (data: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.ssl.sslValidationUrl}?val_id=${data.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_pass}&format=json`,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment error");
  }
};

export const sslService = {
  initPayment,
  validate,
};
