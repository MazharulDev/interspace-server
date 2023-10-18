import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { ServiceController } from "./service.controller";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.ADMIN), ServiceController.createService);
router.get("/", ServiceController.getAllService);
router.get("/:id", ServiceController.getSingleService);
router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.updateService
);

export const ServiceRoutes = router;
