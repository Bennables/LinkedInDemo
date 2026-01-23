import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';
import { error } from 'node:console';
// import {redisClient} from '../../lib/redis.js'

const hireEndpoints: Endpoint = {
    
    async get(req, res){
        const id = req.params.id ? parseInt(req.params.id) : null
        if (!id){
            return res.status(400).json({error: "there's no id, can't find this user"})
        }
        try {
            const queryResponse = await prisma.hires.findUnique({
                where: {
                    id: id
                }
            })
            console.log(queryResponse)
            res.status(200).json({data: queryResponse})
        } catch(e: any) {
            res.status(500).json({error: e.message})
        }
    },
    async post(req, res){
        console.log("POST endpoint has not been implemented")
    },
    async put(req, res){
        //what's the best way to put here???

        //so if they have access to the user, then they probably the right person
        //but no problem if we check again
        try{
            console.log(req.body)
            // const child = await checkCompanyReturnHire(req.body.adminId, req.body.childId)
                if (req.body.id){
                    const { id,start_date, ...safe } = req.body;
                    const [m,y,d] = start_date.split("-")
                    const date = new Date(y, m, d);
                    const update = await prisma.hires.update({
                        where:{id:Number(req.body.id)},
                        data: {...safe, start_date:date}
                    })
                console.log('done')
                res.status(200).json({status: "done", entry: update})
            }else{
                throw new Error("Unable to find at least one of them")
            }
        }
        catch(e: any){
            console.log(e.message)
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async delete(req, res){
        console.log("DELETE endpoint has not been implemented")
    }
}

export default hireEndpoints as Endpoint;