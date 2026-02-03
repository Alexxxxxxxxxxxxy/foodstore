import type { Db } from "mongodb";
import { connectToDb, getDb } from "../models/cartmodel.ts";
import type { Request, Response } from "express";

let db:Db;

connectToDb((err:Error|null)=>{
    if(!err)db=getDb()
    else console.log(err.message)
})

// 添加购物车信息
const addCart = async (req:Request,res:Response)=>{
    try{
        const response = await db.collection("cart").findOne({id:req.body.userId})
        if(!response){
            let cartData = {id:req.body.userId,data:{} as {[key:string]:number}}
            cartData.data[req.body.ItemId]=1
            db.collection("cart").insertOne(cartData)
            res.status(200).json({status:200,message:"购物信息插入成功"})
        }else{
            db.collection("cart").updateOne({id:req.body.userId},{$inc:{[`data.${req.body.ItemId}`]: 1}})
            res.status(200).json({status:200,message:"购物信息更新成功"})
        }
    }catch(err){
        res.status(500).send("服务器发生了错误！")
    }
}

// 移除商品
const removeFromCart = async (req:Request,res:Response)=>{
    try {
    const { userId, ItemId } = req.body as {
        userId: string
        ItemId: string
    }

    const result = await db.collection("cart").updateOne(
        {
        id: userId,
        [`data.${ItemId}`]: { $gt: 0 }
        },
        {
        $inc: { [`data.${ItemId}`]: -1 }
        }
    )

    if (result.modifiedCount === 0) {
        return res.status(400).json({
        status: 400,
        message: "商品数量不能为负数！"
        })
    }

    res.status(200).json({
            status: 200,
            message: "商品减少成功"
        })
    } catch (err) {
        res.status(500).send("服务器发生了错误！")
    }
}

// 获取购物车信息
const getCart = async (req:Request,res:Response)=>{
    try{
        const {userId} = req.body
        const response = await db.collection("cart").findOne({id:userId})
        if(response)res.status(200).json({status:200,data:response.data,message:"获取购物车信息成功"})
        else res.status(200).json({status:400,message:"获取购物车信息成功",data:{} as {[key:string]:number}})
    }catch(err){
        res.status(500).send("服务器发生了错误！")
    }
}

export {addCart, removeFromCart, getCart}