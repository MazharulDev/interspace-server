import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post("/init", PaymentController.initPayment);
router.post("/webhook", PaymentController.webHook);
router.post("/success", PaymentController.paymentSuccess);
router.post("/", PaymentController.paymentDelete);
router.get("/all", PaymentController.paymentFilter);
router.get("/payments/:email", PaymentController.userAllPayment);
router.get("/:id", PaymentController.paymentByTransactionId);

export const PaymentRoutes = router;
