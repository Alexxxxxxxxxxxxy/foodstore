import { connectToDb, getDb } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
let db;
connectToDb((err) => {
    if (!err) {
        db = getDb();
    }
    else {
        console.log(err.message);
    }
});
// 生成token
const createToken = (id) => {
    if (process.env.JWT_SECRET)
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};
//登录
const login = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ status: 400, message: "未找到请求体", body: req.body });
    }
    const { email, password } = req.body;
    try {
        const exist = await db.collection("user").findOne({ email: email });
        if (!exist) {
            return res.status(401).json({ message: "邮箱或密码错误", status: 401 });
        }
        const isMatch = await bcrypt.compare(password, exist.password);
        if (!isMatch) {
            return res.status(404).json({ status: 404, message: "密码错误" });
        }
        const token = createToken(exist._id.toString());
        res.status(200).json({ status: 200, message: "登录成功!", token: token });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
//注册
const register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ status: 400, message: "未找到请求体", body: req.body });
    }
    const { name, password, email } = req.body;
    try {
        // 检查邮箱是否注册
        const exist = await db.collection("user").findOne({ email });
        if (exist) {
            return res.status(409).json({ status: 409, message: "注册邮箱已存在" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: 400, message: "邮箱格式不正确" });
        }
        if (!validator.isAlphanumeric(String(password)) || String(password).length < 8) {
            return res.status(400).json({ status: 400, message: "密码格式不正确或太简单了" });
        }
        // 加密
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(String(password), salt);
        db.collection("user").insertOne({ name: name, password: hashPassword, email: email })
            .then(info => {
            const token = createToken(info.insertedId.toString());
            res.status(200).json({ message: info, status: 200, token: token });
        }).catch(err => {
            res.status(500).json({ message: err });
        });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
export { login, register };
//# sourceMappingURL=usercontroller.js.map