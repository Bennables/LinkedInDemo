import type Endpoint from './endpoint.js';
import {redisClient}  from '../../lib/redis.js'
import { verifyJWT, createJWT } from '../helpers/jwt-helper.js'
const refreshEndpoints : Endpoint = {
    async get(req, res){
        const token = req.cookies.accessToken
        const payoad = verifyJWT(token);
        console.log(payoad)
        res.send(200);
    },
    async post(req, res){
        try{
            const refreshToken = req.cookies.refreshToken
            // console.log(req.cookies)
            if (!refreshToken) {
                return res.status(400).json({message: "No refresh token found"})
            }
            console.log("EEEE")
            const payload = Object(verifyJWT(refreshToken))                  
            if (await redisClient.sIsMember("refreshers", payload.jti)){
                redisClient.sRem("refreshers", payload.jti)            

                // req.cookie
                // if that token's fine, then we can do stuff
                const uuid = crypto.randomUUID();
                
                const {id, companyId, ...trash} = payload
                const newPayload = {id: id, companyId: companyId}
                const accessToken = createJWT(newPayload, '10s', 'acc')
                const refreshToken = createJWT({...newPayload, jti: uuid}, '3d')
                redisClient.sAdd("refreshers", uuid)
                res.clearCookie('accessToken')
                res.clearCookie('refreshToken')

                // console.log("payload   " + payload)
                // console.log("token  "+ accessToken)
                // console.log("refresh  " + refreshToken)

                console.log("CREATED NEW payload, token, refresh")
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
                return res.status(200).json({message: "success!!!! Enjoy the new tokens!"})
            }
            return res.status(401).json({message: "Token not in refresh list"})
        } catch(e: any){
            console.log(e.name)
            // console.error(`${e.name}: ${e.message}`);
            console.log(e.name == 'TokenExpiredError')
            if(e.name = "TokenExpiredError"){
                res.status(401).json({message: "welp"})
            }
            res.status(400)
        }

    },
    async put(req, res){
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({message: "No refresh token found"})
        }
        const payload = Object(verifyJWT(refreshToken)) 
        console.log("Testing the refreshing")           
    },
    async delete(req, res){
        console.log("DELETE endpoint has not been implemented")
    }
}

export default refreshEndpoints as Endpoint;

