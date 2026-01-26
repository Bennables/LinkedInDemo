import jwt, {type JwtPayload} from 'jsonwebtoken';




type Expiration = `${number}${'s' | 'm' | 'h' | 'd'}` | number;
                    //I know this is bad practice, but I don't know what type of param it is
const createJWT = (data: any, expiration: Expiration, type: String="") => {

    const jwtKey: string | undefined = process.env.JWT_KEY;
    if (!jwtKey){
        console.log("YOU HAVEN't CONFIGURED THE JWT_KEY YET. CHECK .env")
        throw Error("you need to add JWT_KEY to .env. it cannot be null")
    }

    let jsonWebToken;
    if (type == "acc"){
        jsonWebToken = jwt.sign(data, String(jwtKey), {expiresIn: expiration});

    }else{
        jsonWebToken = jwt.sign(data, String(jwtKey), {expiresIn: expiration});
    }

    return jsonWebToken
}

const verifyJWT = (token: string) => { 
    try{
        const jwtKey: string | undefined = process.env.JWT_KEY;
        if (!jwtKey){
            console.log("YOU HAVEN't CONFIGURED THE JWT_KEY YET. CHECK .env")
            throw Error("you need to add JWT_KEY to .env. it cannot be null")
        }
        const data: JwtPayload | string = (jwt.verify(token, jwtKey));
        console.log("WE ARE GETTING THRU")
        return data; //not really clear what the type here is/
    }
    catch(e: any){
        throw e
    }

    //!bad will. get a token expired error
}

export {createJWT, verifyJWT}