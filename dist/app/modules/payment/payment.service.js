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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ssl_service_1 = require("../ssl/ssl.service");
const payment_model_1 = require("./payment.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const payment_constant_1 = require("./payment.constant");
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
    const paymentExist = yield payment_model_1.Payment.findOne({
        email: data.userEmail,
        month: data.month,
        year: data.year,
        status: "success",
    });
    if (!paymentExist) {
        yield payment_model_1.Payment.create(paymentData);
        return {
            link: paymentSession.redirectGatewayURL,
        };
    }
    else {
        // throw new ApiError(httpStatus.BAD_REQUEST, "Already payment");
        return null;
    }
    // return paymentSession;
    // // .redirectGatewayURL
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
const paymentFilter = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: payment_constant_1.paymentSearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield payment_model_1.Payment.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield payment_model_1.Payment.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.PaymentService = {
    initPayment,
    webHook,
    paymentSuccess,
    paymentByTransactionId,
    paymentDelete,
    userAllPayment,
    paymentFilter,
};
