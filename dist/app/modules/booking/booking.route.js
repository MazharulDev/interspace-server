"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.createService);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.getAllBooking);
router.get("/single/:email", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.bookingByEmail);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.getBookingByEmail);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), booking_controller_1.BookingController.deleteBooking);
router.patch("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), booking_controller_1.BookingController.updateBookingStatus);
exports.BookingRoutes = router;
