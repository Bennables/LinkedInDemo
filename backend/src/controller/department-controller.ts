import { getUserCompany } from "../helpers/database-helper.js";
import type Endpoint from "./endpoint.js";
import {prisma} from '../../lib/prisma.js'

//!
//!



//! WE NEED TO ENsure same company as the one they trying to edit



//!




const departmentsEndpoint: Endpoint = {
    async get(req, res){
        try{
            const companyId = 1
            const departments = await prisma.department.findMany({where: {companyId: companyId}})
            if (!departments){
                throw new Error("couldn't get all of the departments on query companyId = " + req.body.company)
            }
            res.status(200).json({status: "done", data: departments})
        }
        catch(e: any){
            console.log(e.message || String(e))
            res.status(400).json({error: e.message || String(e)})
        }
    
    },
    async post(req, res){
        try{
            console.log("SKDLJFSDKFKLDSF")
            //! need to use auth req.user
            const companyId = 1
            const departments = await prisma.department.create({data:{
                name: req.body.departmentName,
                companyId: companyId
            }})
            res.status(200).json({status: "done", })
        }
        catch(e: any){
            console.log(e.message || String(e))
            
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async put(req, res){
        try{
            const {oldname}= req.params
            const {newDepartmentName}= req.body
            //run verification to make sure the same company
            const companyId = 1;

            const departments = await prisma.department.update({
                where:
                    {unique_composite: {name: oldname ?? "", companyId: companyId}},
                data: {name:newDepartmentName}
        })


            res.status(200).json({status: "done"})
        }
        catch(e: any){
            console.log(e.message || String(e))
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async delete(req, res){
        try{
            const departments = await prisma.department.delete({where:
                {id: req.body.departmentId}})


            res.status(200).json({status: "done"})
        }
        catch(e: any){
            console.log(e.message || String(e))

            res.status(400).json({error: e.message || String(e)})
        }
    }
}

export default departmentsEndpoint as Endpoint;
