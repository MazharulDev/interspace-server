import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { UserReviewController } from "./userReview.controller";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.USER),
  UserReviewController.createUserReview
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN),
  UserReviewController.getAllUserReview
);
router.get("/publish", UserReviewController.getPublishReview);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserReviewController.updateReview
);
router.get("/:id", UserReviewController.getById);

export const UserReviewRoutes = router;
