import express, {} from "express";
import alipaySdk from "../config/alipay.ts";
import { connectToDb, getDb } from "../models/foodmodel.ts";
let db;
connectToDb((err) => {
    if (!err)
        db = getDb();
    else
        console.log(err.message);
});
// 获得已支付的订单信息
const getOrder = async (req, res) => {
    try {
        const userId = req.body.userId;
        const response = await db.collection("order").find({ userId, status: "paid" }).toArray();
        res.status(200).json({ status: 200, data: response });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
//获取所有订单
const getAllOrder = async (req, res) => {
    try {
        const response = await db.collection("order").find({ status: "paid" }).toArray();
        res.status(200).json({ status: 200, data: response });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
// 更新订单状态
const updateOrder = async (req, res) => {
    try {
        const { out_trade_no } = req.body;
        db.collection("order").updateOne({ out_trade_no }, { $set: { status: "delivery" } })
            .then(info => {
            res.status(200).json({ status: 200, message: "出餐成功" });
        }).catch(err => {
            res.json({ status: 400, message: "出餐失败" });
        });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
// ====== 工具函数：生成唯一交易号 ======
function getTradeNo() {
    return Date.now().toString(); // 简单唯一值
}
// ====== 创建支付订单接口 ======
const createOrder = async (req, res) => {
    const { totalAmount, subject, body } = req.body;
    const out_trade_no = getTradeNo();
    const userId = req.body.userId;
    const response = await db.collection("order").findOne({ userId, status: "pending" });
    if (response) {
        return res.json({ status: 400, message: "您有订单没有完成" });
    }
    try {
        db.collection("order").insertOne({ ...req.body, out_trade_no, status: "pending" });
        const paymentHtml = alipaySdk.pageExec("alipay.trade.page.pay", {
            bizContent: {
                out_trade_no,
                total_amount: totalAmount,
                subject,
                product_code: "FAST_INSTANT_TRADE_PAY",
                body,
                timeout_express: "30m",
            },
            returnUrl: "http://localhost:3000/success",
            notifyUrl: "https://insectean-unmullioned-lilith.ngrok-free.dev/ali/notify",
        });
        // 清空购物车
        const setObj = {};
        req.body.data.forEach((item) => {
            setObj[`data.${item._id}`] = 0;
        });
        db.collection("cart").updateOne({ id: userId }, { $set: setObj });
        res.send(paymentHtml); // 直接返回 HTML 表单 → 浏览器自动跳转
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
// ====== 查询订单接口 ======
const queryOrder = async (req, res) => {
    const { out_trade_no } = req.params;
    try {
        const result = await alipaySdk.exec("alipay.trade.query", {
            bizContent: { out_trade_no },
        });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
// ====== 退款接口 ======
const refund = async (req, res) => {
    const { out_trade_no, refund_amount } = req.body;
    try {
        const result = await alipaySdk.exec("alipay.trade.refund", {
            bizContent: { out_trade_no, refund_amount },
        });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
// ====== 退款查询接口 ======
const queryFund = async (req, res) => {
    const { out_trade_no } = req.params;
    try {
        const result = await alipaySdk.exec("alipay.trade.fastpay.refund.query", {
            bizContent: {
                out_trade_no,
                out_request_no: out_trade_no, // 通常同 out_trade_no
            },
        });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
// ====== 关闭订单接口 ======
const closeOrder = async (req, res) => {
    const { out_trade_no } = req.body;
    try {
        const result = await alipaySdk.exec("alipay.trade.close", {
            bizContent: { out_trade_no },
        });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
// ====== 异步回调接口（notifyUrl） ======
const notifyUrl = async (req, res) => {
    const params = req.body;
    try {
        // 验签
        const verified = alipaySdk.checkNotifySign(params);
        if (!verified)
            return res.status(400).send("fail");
        // 业务处理
        const { out_trade_no, trade_status } = params;
        if (trade_status === "TRADE_SUCCESS" || trade_status === "TRADE_FINISHED") {
            console.log(`订单 ${out_trade_no} 支付成功`);
            const result = await db.collection("order").updateOne({ out_trade_no }, { $set: { status: "paid" } });
            res.status(200).send("success");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("fail");
    }
};
export { createOrder, queryOrder, refund, queryFund, closeOrder, notifyUrl, getOrder, getAllOrder, updateOrder };
//# sourceMappingURL=ordercontroller.js.map