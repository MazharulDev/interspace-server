"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentSchema = void 0;
const mongoose_1 = require("mongoose");
const payment_constant_1 = require("./payment.constant");
exports.PaymentSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
        enum: payment_constant_1.status,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Payment = (0, mongoose_1.model)("Payment", exports.PaymentSchema);
