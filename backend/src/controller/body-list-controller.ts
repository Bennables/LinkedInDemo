import type Endpoint from "./endpoint.js";
import {prisma} from '../../lib/prisma.js'


const companyLoginEndpoint: Endpoint = {
    get(req, res){
        //nothing to do here
    },
    async post(req, res){

        try{
            const company = await prisma.company.findUnique({
                where:{
                    name: req.body.company
                }
            })
            // console.log(company)
            if (company) { 
                //we good
                res.status(200)
                res.redirect(200, "/login");
            }
            else{
                res.status(400).json({message: "That company is not registered with us", code:1})

            }
        }
        catch{(e: Error) => { 
            console.log(e);
            res.status(400).json({message: "We ran into an error", error: `${e}`});
        }
        }
        
    },
    put(req, res){
        //probably won't need to update here.
    },
    delete(req, res){
        //nor delete
    }
};



//I assume this will error if not sent correctly
export default companyLoginEndpoint as Endpoint;



