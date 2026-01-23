import express from 'express';
const mainRouter = express.Router();
import Account from '../controller/user-controller.js';
import hireAdminEndpoints from "../controller/hires-controller.js";
import hireEndpoints from '../controller/hire-endpoint-controller.js';
import pfpEndpoint from '../controller/pfp-controller.js';
import bodyEndpoint from '../controller/email-body-controller.js';
import companyBodiesEndpoint from '../controller/body-list-controller.js';



mainRouter.get("/hires", hireAdminEndpoints.get);
mainRouter.get("/hires/:id", hireEndpoints.get);
mainRouter.get("/image/:id", pfpEndpoint.get);
mainRouter.put("/hires/:id" ,hireEndpoints.put)
mainRouter.put("/user/:id", Account.put)
mainRouter.get("/user/:id", Account.get)

mainRouter.get("/body/:id", bodyEndpoint.get)
mainRouter.get("/bodies/:id",companyBodiesEndpoint.get)
mainRouter.put("/body/:id", bodyEndpoint.put)

// mainRouter.put("/user/:id", )

export default mainRouter
