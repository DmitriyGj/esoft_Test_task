import { Request, Response } from 'express';
import {verify} from 'jsonwebtoken';
import { User } from '../db/entities';



export default function rolecheck(roles:string[]){
    if(typeof roles === 'string'){
        roles = [roles]
    }

    return (req: Request, res: Response, next) => {
        if(req.method === 'OPTIONS'){
            next();
        }

        try {
            const token = req.headers.authorization;
            if(!token){
                return res.status(401).json({message:'Пользователь не авторизован'})
            }
            const decodeData = verify(token, "7") as User;
            if(!roles.includes(decodeData.role.role_name)){
                return res.status(403).json({message:'Нет доступа'});
            }
            next();
        }
        catch(e){
            console.log(e);
            return res.status(403).json({message:'Токен протух'});
        }
    };
}