/*

this one should 
Get: get steps based on the task that it's part of
post: create a new step within the task
update - change the status or name
delete.... go figure
*/



import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js';
import { getUserCompany } from '../helpers/database-helper.js';
import { error } from 'node:console';

const taskStepEndpoint : Endpoint = {
    async get(req, res){
        try{
            // const userCompany = getUserCompany(req.body.payload.company)
            const userCompany = 1;
            const {taskId} = req.params;
            const taskIdNum = Number(taskId);


            if (!taskIdNum){
                //! this must be handled
                res.status(400).json({message: "There's no task id. ERROR"})
            }
            
            const taskSteps = await prisma.taskStep.findMany({
                where:{
                    taskId: taskIdNum
                }
            })

            if (!taskSteps){
                throw new Error("No steps were found for this task")
            }
            res.status(200).json({data:taskSteps})

        }
        catch(e:any){
            res.status(400).json({message: e.message||String})
        }
    },
    async post(req, res){


        

        try{
            const companyId = 1;
            const {taskId} = req.params
            if (!taskId){
                //! this must be handled
                res.status(400).json({message: "There's no task id. ERROR"})
            }
            const taskNumId = Number(taskId);

            const task = await prisma.taskStep.create({
                data: {
                    name: req.body.name,
                    description: req.body.description ?? null,
                    taskId: taskNumId,
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
            const { stepId } = req.params;

            if (!stepId){
                res.status(400).json({message: "There's no step id. ERROR"})
                return;
            }
            const stepNumId = Number(stepId);
            const companyId = 1;
            const step = await prisma.taskStep.update({
                where:{
                    unique:{
                        id: stepNumId,
                        companyId: companyId
                    }
                },
                data: req.body
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
            const stepId = req.params.stepId ? Number(req.params.stepId) : req.body.taskCategoryId;
            if (!stepId) {
                res.status(400).json({ message: "Step id is required" });
                return;
            }
            const step = await prisma.taskStep.delete({
                where: {
                    id: stepId
                }
            });
            if (!step){
                throw new Error("Step wasn't deleted");
            }
            res.status(200).json({ msg: "step deleted", data: step });
        }
        catch(e: any){
            res.status(400).json({error: e.message || String(e)})
        }
    }
}

export default taskStepEndpoint as Endpoint;