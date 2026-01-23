import { type Request, type Response } from 'express';

export default interface Endpoint{
    get(req: Request, res: Response): void | Promise<any>,
    post(req: Request, res: Response): void | Promise<any>,
    put(req: Request, res: Response): void | Promise<any>,
    delete(req: Request, res: Response): void | Promise<any>,
}

/*



import type Endpoint from '../controller/endpoint.js';
import {prisma} from '../../lib/prisma.js';

const ENDPOINT_NAME : Endpoint = {
    async get(req, res){
        console.log("GET endpoint has not been implemented")
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

export default ENDPOINT_NAME as Endpoint;


*/