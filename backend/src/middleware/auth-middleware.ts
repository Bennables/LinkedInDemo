import type { Request, Response, NextFunction } from "express"
import "../express.js"
import { verifyJWT } from "../helpers/jwt-helper.js"
import jwt from 'jsonwebtoken'


const authenticateToken = (req: Request, res: Response, next: NextFunction)=>{
    try{
        const token = req.cookies.accessToken
        // console.log(token);
        console.log('Testing a token')
        if(!token){
            throw new Error("There is no authorization token. ")
        }
        const payload = verifyJWT(token);
        // at the very least, we have userId, companyId, userName
        req.user = payload as any

        next();
    }
    catch(e:any){
        return res.status(401).json({message: "Token expired or invalid"})
    }
    
}

export {authenticateToken};