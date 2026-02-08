import express, {} from "express";
import { AlipaySdk } from "alipay-sdk";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
// ====== Alipay SDK 初始化（沙盒 + RSA2） ======
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
if (!privateKey || !publicKey) {
    throw new Error("Private key or public key is missing");
}
const alipaySdk = new AlipaySdk({
    appId: "9021000159670828", // 沙盒 AppID
    privateKey,
    alipayPublicKey: publicKey,
    gateway: "https://openapi-sandbox.dl.alipaydev.com/gateway.do",
    signType: "RSA2",
});
export default alipaySdk;
//# sourceMappingURL=alipay.js.map