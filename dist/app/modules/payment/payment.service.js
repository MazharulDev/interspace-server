"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ssl_service_1 = require("../ssl/ssl.service");
const payment_model_1 = require("./payment.model");
const initPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = new mongoose_1.default.Types.ObjectId().toString();
    const paymentSession = yield ssl_service_1.sslService.initPayment({
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
    yield payment_model_1.Payment.create(paymentData);
    return paymentSession.redirectGatewayURL;
});
const paymentSuccess = (transId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.updateOne({ transactionId: transId }, { $set: { status: "success" } });
    return result;
});
const paymentByTransactionId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findOne({ transactionId: id });
    return result;
});
const paymentDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.deleteOne({ transactionId: id });
    return result;
});
const webHook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload || !(payload === null || payload === void 0 ? void 0 : payload.status) || (payload === null || payload === void 0 ? void 0 : payload.status) !== "VALID") {
        return {
            massage: "Invalid Payment!",
        };
    }
    const result = yield ssl_service_1.sslService.validate(payload);
    console.log(result);
    if ((result === null || result === void 0 ? void 0 : result.status) !== "VALID") {
        return {
            massage: "Payment failed",
        };
    }
    const { tran_id } = result;
    yield payment_model_1.Payment.updateOne({ transactionId: tran_id }, { $set: { status: "success" } });
    return {
        message: "Payment success",
    };
});
const userAllPayment = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find({ email: email, status: "success" });
    return result;
});
exports.PaymentService = {
    initPayment,
    webHook,
    paymentSuccess,
    paymentByTransactionId,
    paymentDelete,
    userAllPayment,
};
