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
exports.UserReviewService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const userReview_constant_1 = require("./userReview.constant");
const userReview_model_1 = require("./userReview.model");
const createUserReview = (userReview) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userReview_model_1.UserReview.create(userReview);
    return result;
});
const getAllUserReview = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: userReview_constant_1.userReviewSearchableFields.map((field) => ({
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
    const result = yield userReview_model_1.UserReview.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield userReview_model_1.UserReview.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getPublishReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userReview_model_1.UserReview.find({ status: "publish" }).sort("-updatedAt");
    return result;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userReview_model_1.UserReview.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userReview_model_1.UserReview.findById(id);
    return result;
});
exports.UserReviewService = {
    createUserReview,
    getAllUserReview,
    getPublishReview,
    updateReview,
    getById,
};
