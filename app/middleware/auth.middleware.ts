import { Request, Response } from 'express';
import {verify} from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next) {
    if(req.method === 'OPTIONS'){
        next();
    }

    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({message:'Пользователь не авторизован'})
        }
        const decodeData = verify(token, "7")
        next();
    }
    catch(e){
        console.log(e);
        return res.status(403).json({status:403,message:'Токен протух'});
    }
};