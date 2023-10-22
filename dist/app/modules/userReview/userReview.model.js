"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReview = exports.UserReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserReviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.UserReview = (0, mongoose_1.model)("UserReview", exports.UserReviewSchema);
