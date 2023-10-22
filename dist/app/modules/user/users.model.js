"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const users_constant_1 = require("./users.constant");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: users_constant_1.role,
        default: "user",
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Users = (0, mongoose_1.model)("User", exports.UserSchema);
