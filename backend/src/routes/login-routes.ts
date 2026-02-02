import express from 'express';
const mainRouter = express.Router();
import mainController from '../controller/company-login-controller.js';
import companyLogin from '../controller/company-login-controller.js';
import loginEndpoints from '../controller/login-controller.js';
import Account from '../controller/user-controller.js';
import { received } from '../middleware/logging-middleware.js';
import hireAdminEndpoints from "../controller/hires-controller.js";
import hireEndpoints from '../controller/hire-endpoint-controller.js';
import pfpEndpoint from '../controller/pfp-controller.js';
import bodyEndpoint from '../controller/email-body-controller.js';
import companyBodiesEndpoint from '../controller/body-list-controller.js';
import departmentsEndpoint from '../controller/departments.js';
import { authenticateToken } from '../middleware/auth-middleware.js';
import refreshEndpoints from '../controller/refresh-controller.js';
import userEndpoint from '../controller/user-controller.js';
import taskEndpoint from '../controller/task-controller.js';
import taskByIdEndpoint from '../controller/task-by-id-controller.js';
import taskStepEndpoint from '../controller/task-step-controller.js';


mainRouter.post("/login", loginEndpoints.post);


mainRouter.get("/account", Account.get);
mainRouter.post("/account", Account.post);

mainRouter.post("/company", companyLogin.post);

mainRouter.put("/account", Account.put);
mainRouter.delete("/account", Account.delete);
mainRouter.get("/hires", hireAdminEndpoints.get);
mainRouter.get("/hires/:id", hireEndpoints.get);
mainRouter.get("/image/:id", pfpEndpoint.get);
mainRouter.put("/hires/:id" ,hireEndpoints.put);

mainRouter.put("/user/:id", Account.put)
mainRouter.get("/user/:id", Account.get)

mainRouter.get("/body/:id", bodyEndpoint.get)
mainRouter.get("/bodies/:id",companyBodiesEndpoint.get)
mainRouter.put("/body/:id", bodyEndpoint.put)
mainRouter.get("/dept", departmentsEndpoint.get)
mainRouter.post("/dept", departmentsEndpoint.post)
mainRouter.put("/dept/:oldname", departmentsEndpoint.put)
mainRouter.delete("/dept",departmentsEndpoint.delete)



mainRouter.get("/task", taskEndpoint.get)
mainRouter.get("/task/:taskId/steps", taskStepEndpoint.get)
mainRouter.post("/task/:taskId/steps", taskStepEndpoint.post)
mainRouter.put("/task/:taskId/steps/:stepId", taskStepEndpoint.put)
mainRouter.delete("/task/:taskId/steps/:stepId", taskStepEndpoint.delete)
mainRouter.get("/task/:taskId", taskByIdEndpoint.get)
mainRouter.post("/task", taskEndpoint.post)
mainRouter.put("/task/:oldname", taskEndpoint.put)
mainRouter.delete("/task",taskEndpoint.delete)


mainRouter.post("/refresh", refreshEndpoints.post)
// mainRouter.get("/tokens", testEndpoint.get)
mainRouter.get("/refresh", refreshEndpoints.get)




// mainRouter.use(authenticateToken)
mainRouter.put("/refresh", refreshEndpoints.put)



//this one needs a login feature
// mainRouter.post("/login", testEndpoint.post)


mainRouter.post("/create", userEndpoint.post)
            
// mainRouter.put("/hello", testEndpoint.put)
// mainRouter.delete("/hello", testEndpoint.delete);




// mainRouter.put("/user/:id", )

export default mainRouter
