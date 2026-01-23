import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';

const companyBodiesEndpoint : Endpoint = {
    async get(req, res){
        try{
            const data = await prisma.body.findMany({
            where: {companyId: Number(req.params.id) || 0}
        })
        res.status(200).json({message: "retrieved the body data;", data: data})
        }
        catch(e:any){
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async post(req, res){
        console.log("POST endpoint has not been implemented")
    },
    async put(req, res){
        console.log("UPDATE endpoint has not been implemented")
    },
    async delete(req, res){
        console.log("DELETE endpoint has not been implemented")
    }
}

export default companyBodiesEndpoint as Endpoint;