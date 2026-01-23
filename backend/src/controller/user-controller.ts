import {prisma} from '../../lib/prisma.js';
import type Endpoint from './endpoint.js';



const userEndpoint : Endpoint = {

    async get(req, res) { 
        try{
            const {id} = req.params
            const queryResponse = await prisma.user.findUnique({
                where:{
                    id:Number(id)
                }
            })
            res.status(200).json({data: queryResponse})
        }
        catch{ (e: Error) => { 
            console.log(e);
            res.status(400).json({message: "We ran into an error", error: `${e}`});

            }   
        }
        
    },
    async post(req, res){
        //create account
        try{
            const checkUsername = await prisma.user.findUnique({where:{username: req.body.username}});
            if (!checkUsername){
                // DO STUFF
                const newUser = await prisma.user.create({data: {
                    first_name: "ben",
                    middle_name: "ben",
                    last_name: "ben",
                    username: " aledj",
                    password: "alej",
                    companyId: 2
                
                }})
            }
            else{
                res.status(400).json({message: "bad username, someone else is already using it"})
            }
        }
        catch{(e: Error) => {
            console.log(e);
            res.status(400).json({message: "We ran into an error", error: `${e}`});
            }
        }

        //unique indentifier = username
    },
    async put(req, res){
        //update user
        try{
            console.log("WE GOT HERE ")
            console.log(req.body)
            const {id, hire, ...data} = req.body
            console.log(data);
            const update = await prisma.user.update({
                where :{
                    id: id 
                },
                data:data
            })
            console.log("FDSFDF")
            res.status(200).json({message: "successfull updated!"})
        }
        catch{(e: Error) => {
            console.log(e);
            res.status(400).json({message: "We ran into an error", error: `${e}`});
        }
        }

    },
    async delete(req, res) {
        //remove person
        //!this should be verified
        const username = req.body.altUser;
        try{
            const deleted = await prisma.user.delete({
                where: {
                    username: username
                }
            })
        }
        catch{(e: Error) => {
            console.log(e);
            res.status(400).json({message: "We ran into an error", error: `${e}`});
        }}
        
        
    },


}
export default userEndpoint as Endpoint;