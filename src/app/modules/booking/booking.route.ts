import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { BookingController } from "./booking.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), BookingController.createService);

export const BookingRoutes = router;
