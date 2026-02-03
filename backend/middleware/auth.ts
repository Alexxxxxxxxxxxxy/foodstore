import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

interface DecodedToken {
    id: string; 
}

const authMiddleWare = async (req:Request,res:Response,next:NextFunction)=>{
    const {token} = req.headers

    if(!token){
        return res.json({status:401,Message:"请先登录"})
    }
    try {
        let token_decode: DecodedToken | undefined;

        if (typeof token === "string" && process.env.JWT_SECRET) {
            token_decode = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
            req.body.userId = token_decode.id;
            next();
        } else {
            res.status(401).json({ message: 'Authorization failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export default authMiddleWare