import express from 'express';
import { addFood, foodList, removeFood } from '../controllers/foodcontroller.ts';
import multer from 'multer';
const foodRouter = express.Router();
// 图片存储
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        const date = new Date();
        const filename = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${file.originalname}`;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", foodList);
foodRouter.delete("/remove", removeFood);
export default foodRouter;
//# sourceMappingURL=foodrouter.js.map