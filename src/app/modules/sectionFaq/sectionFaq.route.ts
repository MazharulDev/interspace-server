import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { SectionFaqController } from "./sectionFaq.controller";
const router = express.Router();

router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN),
  SectionFaqController.createSectionFaq
);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), SectionFaqController.getAllFaq);

export const SectionFaqRoutes = router;
