import type Endpoint from './endpoint.js';
import {prisma} from '../../lib/prisma.js'

// requests from
const hireAdminEndpoints: Endpoint = { 
    async get(req, res){
        console.log("hghghghg")
        try{
            //! MISSING ERROR HANDLING!!!!!
            const companyID = 1
            const rows = await prisma.user.findMany({
                where:{companyId:companyID, admin:false},
                select:{
                    id: true,
                    first_name: true,
                    last_name: true,
                    companyId: true,
                    prof_pic_id: true,
                    hire:{
                        select:{
                            id: true,
                            start_date: true,
                            hire:{
                                select:{
                                    id: true,
                                    lastupdatedby: true,
                                    task_id: true,
                                    task:{
                                        select:{
                                            name: true
                                        }
                                    }
                                },                                
                            }
                        }
                    },
                }
            })
            const pic =
            console.log(rows)
            //! MISSING ERROR HANDLING!!!!!
            const flat = rows.map(u => ({
                userId: u.id,
                name: `${u.first_name} ${u.last_name}`,
                startDate: u.hire?.start_date ? u.hire.start_date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                    }).replace(/\//g, "-")
                : null,
                lastUpdatedBy: u.hire?.hire[0]?.lastupdatedby,
                taskName: u.hire?.hire[0]?.task?.name,
                prof_pic_id:u.prof_pic_id
            }))
            console.log(flat)
            res.status(200).json({data: flat});
        }
        catch(e: any){
            res.status(400).json({error: e.message || String(e)})
        }
    },
    async post(req, res){
        // conso
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
                        where:{id:req.body.id},
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
        try{
            if (req.body.id){
                const id = Number(req.body.id);
                const del = prisma.hires.delete({where:{id:id}})
                res.status(200).json({message: "we successfully delete the hire"})
            }
            else{
                throw new Error("We couldn't find an ID to delete")
            }
        }
        catch(e:any){
            res.status(400).json({error: e.message || String(e)})
        }
    }
}

export default hireAdminEndpoints as Endpoint;