import express from "express";
import { closeOrder, createOrder, getAllOrder, getOrder, notifyUrl, queryFund, queryOrder, refund, updateOrder } from "../controllers/ordercontroller.js";
import authMiddleWare from "../middleware/auth.js";
const orderRouter = express.Router();
orderRouter.get("/list", getAllOrder);
orderRouter.post("/list", authMiddleWare, getOrder);
orderRouter.post("/update", updateOrder);
orderRouter.post("/pay", authMiddleWare, createOrder);
orderRouter.get("/query/:out_trade_no", authMiddleWare, queryOrder);
orderRouter.post("/refund", authMiddleWare, refund);
orderRouter.get("/refund-query/:out_trade_no", authMiddleWare, queryFund);
orderRouter.post("/close", authMiddleWare, closeOrder);
orderRouter.post("/notify", notifyUrl);
export default orderRouter;
//# sourceMappingURL=orderrouter.js.map