import express from "express"
import cors from "cors"
import foodRouter from "./routes/foodrouter.ts"
import userRouter from "./routes/userrouter.ts"
import "dotenv/config"
import cartRouter from "./routes/cartrouter.ts"
import orderRouter from "./routes/orderrouter.ts"

const app = express()

// 全局中间件设置
app.use(express.json()) //json格式文件支持
app.use(express.urlencoded({extended:true})) //表单数据支持
app.use(cors()) //跨域支持

// API路由设置
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/images",express.static("uploads"))
app.use("/ali",orderRouter)

app.listen(8000,()=>{
    console.log("running at port 8000")
})