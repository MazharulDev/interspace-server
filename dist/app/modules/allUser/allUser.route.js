"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllUserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const allUser_controller_1 = require("./allUser.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const allUser_validation_1 = require("./allUser.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(allUser_validation_1.UserValidation.createUserZodSchema), allUser_controller_1.UserController.createUser);
router.post("/create-admin", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.default)(allUser_validation_1.UserValidation.createUserZodSchema), allUser_controller_1.UserController.createAdmin);
router.get("/:email", allUser_controller_1.UserController.getSingleUser);
router.patch("/:email", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), allUser_controller_1.UserController.updateAllUser);
exports.AllUserRoutes = router;
