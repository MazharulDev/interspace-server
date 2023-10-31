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
router.get("/", SectionFaqController.getAllFaq);
router.get("/:id", SectionFaqController.faqById);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  SectionFaqController.deleteFaq
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  SectionFaqController.updateById
);

export const SectionFaqRoutes = router;
