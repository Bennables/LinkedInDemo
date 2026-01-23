import { type Request, type Response, type NextFunction} from "express"


const received = (req: Request, res: Response, next: NextFunction) =>{
    console.log(`We received something from ${req.url}`);
    next();
}


export{received}