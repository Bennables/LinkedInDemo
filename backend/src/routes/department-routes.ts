import { Router } from 'express';
import departmentsEndpoint from '../controller/departments.js';


const departmentRouter = Router();

departmentRouter.get("/", departmentsEndpoint.get)
departmentRouter.post("/", departmentsEndpoint.post)
departmentRouter.put("/", departmentsEndpoint.put)
departmentRouter.delete("/",departmentsEndpoint.delete)


export default departmentRouter