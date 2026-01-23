
import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';

const bodyEndpoint : Endpoint = {
    async get(req, res){
        try{
            console.log("GSDFSDF")
            const id = Number(req.params.id) || 0
            console.log(id)

            const queryResponse = await prisma.body.findUnique({
                where:{id: id}
            })
            res.status(200).json({msg: "get body is good", data:queryResponse})
        }
        catch(err: any){
            console.log(err.message || String(err))
            res.status(400).json({message:"There was an error in bodyEndpoint get", err: err.message||String(Error)})
        }
    },
    async post(req, res){
        try{
            const queryResponse = await prisma.body.create({
                data:{
                    companyId: req.user.companyId,
                    ...req.body.bodyValues
                }
            })
            res.status(200).json({msg: "post bodys is good", data:queryResponse})
        }
        catch(err: any){
            res.status(400).json({message:"There was an error in bodyEndpoint post", err: err.message||String(Error)})
        }
    },
    async put(req, res){
        try{
            const id = parseInt(req.body.id);


            const queryResponse = await prisma.body.upsert({
                where: { id: id},
                update: {
                    text: req.body.content
                },
                create: {
                    id: id,
                    text: req.body.content,
                    companyId: 1
                }
            })
            res.status(200).json({msg: "body updated", data: queryResponse})
        }
        catch(err: any){
            res.status(400).json({error: err.message || String(err)})
        }
    },
    async delete(req, res){
        try{
            const userCompany = await getUserCompany(req.body.payload.userId);
            const entry = await prisma.body.findUnique({where:{id:req.body.bodyId}})
            if (!entry){
                throw new Error("body doesn't exist")
            }
            if (userCompany != entry.companyId){
                throw new Error("different companies between user and body")
            }
            const queryResponse = await prisma.body.delete({
                where:{
                    id: req.body.bodyId
                }
            })
            res.status(200).json({msg: "delete bodys is good", data:queryResponse})
        }
        catch(err: any){
            res.status(400).json({message:"There was an error in bodyEndpoint get", err: err.message||String(Error)})
        }
    }
}

export default bodyEndpoint as Endpoint;

