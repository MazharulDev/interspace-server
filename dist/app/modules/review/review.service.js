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
exports.ReviewService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const service_model_1 = require("../service/service.model");
const review_constant_1 = require("./review.constant");
const review_model_1 = require("./review.model");
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.create(payload);
    const reviewId = review._id;
    const serviceId = review.serviceId;
    yield service_model_1.Service.findByIdAndUpdate(serviceId, {
        $push: { reviews: { $each: [reviewId], $position: 0 } },
    });
    return review;
});
const getAllReview = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: review_constant_1.reviewSearchableFields.map((field) => ({
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
    const result = yield review_model_1.Review.find(whereConditions)
        .populate("author")
        .populate("serviceId")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield review_model_1.Review.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const deleteReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield review_model_1.Review.findById(id);
    if (!service) {
        throw new Error("review not found");
    }
    const serviceId = service.serviceId;
    yield service_model_1.Service.findByIdAndDelete(id);
    const result = yield service_model_1.Service.findByIdAndUpdate(serviceId, {
        $pull: { reviews: id },
    });
    return result;
});
exports.ReviewService = {
    createReview,
    getAllReview,
    deleteReviewById,
};
