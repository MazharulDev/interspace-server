import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { ReviewController } from "./review.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.USER), ReviewController.createReview);
router.get("/", ReviewController.getAllReview);
router.delete("/:id",auth(ENUM_USER_ROLE.USER), ReviewController.deleteReviewById);

export const ReviewRoutes = router;
