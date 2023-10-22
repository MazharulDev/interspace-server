"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionFaq = exports.SectionFaqSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SectionFaqSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.SectionFaq = (0, mongoose_1.model)("SectionFaq", exports.SectionFaqSchema);
