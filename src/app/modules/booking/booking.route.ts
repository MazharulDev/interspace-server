import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { BookingController } from "./booking.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), BookingController.createService);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getAllBooking
);
router.get(
  "/single/:email",
  auth(ENUM_USER_ROLE.USER),
  BookingController.bookingByEmail
);
router.get("/", auth(ENUM_USER_ROLE.USER), BookingController.getBookingByEmail);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.deleteBooking
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.updateBookingStatus
);

export const BookingRoutes = router;
