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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const admin_model_1 = require("../admin/admin.model");
const users_model_1 = require("../user/users.model");
const allUser_model_1 = require("./allUser.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "user";
    const userAdded = yield users_model_1.Users.create(user);
    const userInfo = {
        email: userAdded.email,
        password: user.password,
        role: userAdded.role,
        user: userAdded._id,
    };
    const result = yield allUser_model_1.AllUsers.create(userInfo);
    return result;
});
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    admin.role = "admin";
    const adminAdded = yield admin_model_1.Admin.create(admin);
    const adminInfo = {
        email: adminAdded.email,
        password: admin.password,
        role: adminAdded.role,
        admin: adminAdded._id,
    };
    const result = yield allUser_model_1.AllUsers.create(adminInfo);
    return result;
});
const getSingleUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield allUser_model_1.AllUsers.findOne({ email: email })
        .populate("user")
        .populate("admin");
    return result;
});
const updateAllUser = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield allUser_model_1.AllUsers.findOneAndUpdate({ email: email }, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createUser,
    createAdmin,
    getSingleUser,
    updateAllUser,
};
