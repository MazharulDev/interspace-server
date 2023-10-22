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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const users_constant_1 = require("../user/users.constant");
const admin_model_1 = require("./admin.model");
const allUser_model_1 = require("../allUser/allUser.model");
const users_model_1 = require("../user/users.model");
const getAllAdmins = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: users_constant_1.userSearchableFields.map((field) => ({
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
    const result = yield admin_model_1.Admin.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield admin_model_1.Admin.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateAdmin = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findOneAndUpdate({ email: email }, payload, {
        new: true,
    });
    return result;
});
const deleteAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield allUser_model_1.AllUsers.findOneAndDelete({ admin: id });
    if (result === null || result === void 0 ? void 0 : result._id) {
        yield admin_model_1.Admin.findByIdAndDelete(id);
    }
    return result;
});
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (payload.role === "admin") {
        result = yield admin_model_1.Admin.findByIdAndUpdate(id, payload, { new: true });
        return result;
    }
    else if (payload.role === "user") {
        const insertData = {
            name: payload.name,
            email: payload.email,
            role: payload.role,
            phoneNumber: payload.phoneNumber,
        };
        const result = yield users_model_1.Users.create(insertData);
        yield allUser_model_1.AllUsers.findOneAndUpdate({ admin: id }, { role: payload.role, user: result._id });
        yield admin_model_1.Admin.findByIdAndDelete(id);
        return result;
    }
    return result;
});
const singleAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id);
    return result;
});
exports.AdminService = {
    getAllAdmins,
    updateAdmin,
    deleteAdmin,
    updateById,
    singleAdminById,
};
