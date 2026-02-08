import express from "express";
import { addCart, getCart, removeFromCart } from "../controllers/cartcontroller.ts";
import authMiddleWare from "../middleware/auth.ts";
const cartRouter = express.Router();
cartRouter.post("/add", authMiddleWare, addCart);
cartRouter.post("/remove", authMiddleWare, removeFromCart);
cartRouter.post("/list", authMiddleWare, getCart);
export default cartRouter;
//# sourceMappingURL=cartrouter.js.map