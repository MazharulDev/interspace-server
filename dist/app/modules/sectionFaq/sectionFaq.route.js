"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionFaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const sectionFaq_controller_1 = require("./sectionFaq.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), sectionFaq_controller_1.SectionFaqController.createSectionFaq);
router.get("/", sectionFaq_controller_1.SectionFaqController.getAllFaq);
router.get("/:id", sectionFaq_controller_1.SectionFaqController.faqById);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), sectionFaq_controller_1.SectionFaqController.deleteFaq);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), sectionFaq_controller_1.SectionFaqController.updateById);
exports.SectionFaqRoutes = router;
