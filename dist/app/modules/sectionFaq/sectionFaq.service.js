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
exports.SectionFaqService = void 0;
const sectionFaq_model_1 = require("./sectionFaq.model");
const createService = (faqInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sectionFaq_model_1.SectionFaq.create(faqInfo);
    return result;
});
const getAllFaq = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sectionFaq_model_1.SectionFaq.find({});
    return result;
});
const deleteFaq = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sectionFaq_model_1.SectionFaq.findByIdAndDelete(id);
    return result;
});
const faqByid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sectionFaq_model_1.SectionFaq.findById(id);
    return result;
});
const updateByid = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sectionFaq_model_1.SectionFaq.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.SectionFaqService = {
    createService,
    getAllFaq,
    deleteFaq,
    faqByid,
    updateByid,
};
