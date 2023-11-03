"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/init", payment_controller_1.PaymentController.initPayment);
router.post("/webhook", payment_controller_1.PaymentController.webHook);
router.post("/success", payment_controller_1.PaymentController.paymentSuccess);
router.post("/", payment_controller_1.PaymentController.paymentDelete);
router.get("/payments/:email", payment_controller_1.PaymentController.userAllPayment);
router.get("/:id", payment_controller_1.PaymentController.paymentByTransactionId);
exports.PaymentRoutes = router;
