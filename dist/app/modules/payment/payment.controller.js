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
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const payment_constant_1 = require("./payment.constant");
const pagination_1 = require("../../../constants/pagination");
const initPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.initPayment(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "payment init successfully",
        data: result,
    });
});
const webHook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.PaymentService.webHook(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "payment verified successfully",
        data: result,
    });
});
const paymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    const result = yield payment_service_1.PaymentService.paymentSuccess(transactionId);
    if (result.modifiedCount > 0) {
        res.redirect(`${config_1.default.client_url}/user/booking/pay/success?transactionId=${transactionId}`);
    }
});
const paymentByTransactionId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield payment_service_1.PaymentService.paymentByTransactionId(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "payment retrived successfully",
        data: result,
    });
});
const paymentDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = req.query;
    const result = yield payment_service_1.PaymentService.paymentDelete(transactionId);
    if (result.deletedCount) {
        res.redirect(`${config_1.default.client_url}/user/booking/pay/fail?transactionId=${transactionId}`);
    }
});
const userAllPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const result = yield payment_service_1.PaymentService.userAllPayment(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "user payments retrived successfully",
        data: result,
    });
});
const paymentFilter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, payment_constant_1.paymentFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield payment_service_1.PaymentService.paymentFilter(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Payments retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
exports.PaymentController = {
    initPayment,
    webHook,
    paymentSuccess,
    paymentByTransactionId,
    paymentDelete,
    userAllPayment,
    paymentFilter,
};
