import type Endpoint from "./endpoint.js";
import {prisma} from '../../lib/prisma.js'
import { createJWT } from "../helpers/jwt-helper.js";
import { redisClient } from "../../lib/redis.js";
import argon2 from 'argon2';
import type { arch } from "node:os";


const loginEndpoint: Endpoint = {
    get(req, res){
        //don't need to get
    },
    async post(req, res){
        try{
            const user = (await prisma.user.findUnique({where: {username: req.body.username}}))
            if (!user){
                throw new Error("No user could be found with that username");
            }
            
            const hashedPassword = user.password
            if(await argon2.verify(hashedPassword, req.body.password)){

                const payload = {
                    id: user.id,
                    companyId: user.companyId
                }
                const accessToken = createJWT(payload, '10s', 'acc')
                const uuid = crypto.randomUUID();
                const refreshToken = createJWT({...payload, jti:uuid}, '10m')
                redisClient.SADD("refreshers", uuid);

                console.log("payload   " + payload)
                console.log("token  "+ accessToken)
                console.log("refresh  " + refreshToken)
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 1000 * 600 // time in ms
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 1000 * 3600 //time in ms
                })
                res.status(200).json({message: "success!!!!"})

            }
            else { 
                res.status(403).json({message: "invalid password!"})
            }
        }catch( e: any){
            res.status(400).json({message: 'error' + e.message || String(e)})
        }
    },
    put(req, res){
        //not needed
    },
    delete(req, res){
        //not needed
    }
}

export default loginEndpoint as Endpoint;