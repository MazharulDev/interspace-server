"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/", users_controller_1.UserController.getAllUsers);
router.get("/:id", users_controller_1.UserController.userById);
router.patch("/update/:id", users_controller_1.UserController.updateById);
router.patch("/:email", users_controller_1.UserController.updateUser);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteUser);
exports.UsersRoutes = router;
