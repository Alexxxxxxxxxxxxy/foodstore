import { ObjectId } from "mongodb";
import { connectToDb, getDb } from "../models/foodmodel.ts";
import fs from 'fs';
//连接数据库
let db;
connectToDb((err) => {
    if (!err) {
        db = getDb();
    }
    else {
        console.log(err.message);
    }
});
// 添加食物
const addFood = async (req, res) => {
    let image_filename = `${req.file?.filename}`;
    const food = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    };
    try {
        // 插入食物到数据库
        await db.collection("food").insertOne(food)
            .then(info => {
            res.status(200).json({ message: info, status: 200 });
        }).catch(err => {
            res.status(500).json({ message: err });
        });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
// 获得数据库所有食物
const foodList = async (req, res) => {
    try {
        const food = await db.collection("food").find().toArray();
        res.status(200).json({ data: food, status: 200 });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
// 删除食物
const removeFood = async (req, res) => {
    try {
        const food = await db.collection("food").findOne({ _id: new ObjectId(req.body.id) });
        if (!food) {
            return res.status(404).json({ message: "未找到该食物" });
        }
        fs.unlink(`uploads/${food?.image}`, (err) => {
            if (err) {
                console.log("文件删除失败!");
            }
        });
        await db.collection("food").findOneAndDelete({ _id: new ObjectId(req.body.id) })
            .then(info => {
            res.status(200).json({ message: info, status: 200 });
        }).catch(err => {
            res.status(500).json({ message: err });
        });
    }
    catch (err) {
        res.status(500).send("服务器发生了错误！");
    }
};
export { addFood, foodList, removeFood };
//# sourceMappingURL=foodcontroller.js.map