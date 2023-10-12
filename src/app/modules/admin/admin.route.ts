import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";
const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.SUPER_ADMIN), AdminController.getAllAdmins);

export const AdminRoutes = router;
