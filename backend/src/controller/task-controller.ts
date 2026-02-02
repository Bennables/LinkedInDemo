import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';
import { getUserCompany } from '../helpers/database-helper.js';
import { error } from 'node:console';

const taskEndpoint : Endpoint = {
    async get(req, res){
        try{
            // const userCompany = getUserCompany(req.body.payload.company)
            const userCompany = 1;
            
            const tasks = await prisma.taskCategory.findMany({
                where:{
                    companyId: userCompany
                }
            })

            if (!tasks){
                throw new Error("No steps were found for this task")
            }
            res.status(200).json({data:tasks})

        }
        catch(e:any){
            res.status(400).json({message: e.message||String})
        }
    },
    
    async post(req, res){
        console.log("DKSLFJLKSDF")
        try{
            const companyId = 1;


            const task = await prisma.taskCategory.create({
                data: {
                    name: req.body.name,
                    companyId: companyId
                }
            })
            if (!task){
                throw new Error("task wasn't created???")
            }
            res.status(200).json({msg: "task created", data: task})
        }
        catch(e: any){
            res.status(400).json({message: e.message||String})
        }
    },
    async put(req, res){
        try{
            const companyId = 1;
            const {oldname} = req.params; 
            const step = await prisma.taskCategory.update({
                where:{
                    unique_task:{
                        name: oldname ?? "",
                        companyId: companyId
                    }
                },
                data: {name: req.body.newTaskName}

            })
            if (!step){
                throw new Error("task wasn't updated")
            }
            res.status(200).json({msg: "task updated", data: step})
        }
        catch(e: any){
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async delete(req, res){
        try{
            const userCompany = 1;
                if (userCompany == req.body.taskCompany){
                const step = await prisma.taskCategory.delete({
                    where:{
                        id: req.body.taskCategoryId
                    },

                })
                if (!step){
                    throw new Error("task wasn't updated")
                }
                res.status(200).json({msg: "task deleted", data: step})
            }
            throw new Error("wrong company")
        }
        catch(e: any){
            res.status(400).json({error: e.message || String(e)})
        }
    }
};

export default taskEndpoint as Endpoint;