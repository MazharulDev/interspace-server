"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const userReview_controller_1 = require("./userReview.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), userReview_controller_1.UserReviewController.createUserReview);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), userReview_controller_1.UserReviewController.getAllUserReview);
router.get("/publish", userReview_controller_1.UserReviewController.getPublishReview);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), userReview_controller_1.UserReviewController.updateReview);
router.get("/:id", userReview_controller_1.UserReviewController.getById);
exports.UserReviewRoutes = router;
