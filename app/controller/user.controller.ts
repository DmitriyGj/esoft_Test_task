import { NextFunction, Request, Response } from 'express';
import DataSource  from '../db/datasource';
import { User} from '../db/entities';
import { hashSync, compareSync} from 'bcrypt';
import RoleController from './role.controller';
import User_detailsController from './user_details.controller';
import {sign} from 'jsonwebtoken';
import { FindOptionsWhere } from 'typeorm';

const user_repository = DataSource.getRepository(User);
const genirateAccessToken = (info) =>{
    const payload = {
        info
    };
    const token = sign(payload,'7',{expiresIn:'24h'});
    return token;
}

class UserController {
    async registrate(req: Request, res: Response, next: NextFunction)  {
        const {login, password, role_id, supervisor_id, ...user_details} = req.body;

        const uniqeControl = await user_repository.findOne({where:{login}});        
        if(uniqeControl){
            return res.status(400).send({message:'Пользователь с таким логином существует'});
        }
        const role = await  RoleController.getOneByParams({role_id});
        const supervisor = await user_repository.findOne({where:{user_id:supervisor_id}});

        const newUserDetails = User_detailsController.create({...user_details, supervisor});

        const savedUserDetails = await User_detailsController.save(newUserDetails);
        if(savedUserDetails){
            try{
            const newUser = user_repository.create({login, password:hashSync(password,7), role,user_details:savedUserDetails })
                const result = await user_repository.save(newUser);
                return res.status(200).json(result);
            }
            catch(e){
                await User_detailsController.delete(savedUserDetails);
                return res.status(400).json({message:'Что-то пошло не так'})
            }
        }
        res.status(400).json({message:'Что-то пошло не так'});
    }

    async authorize(req: Request, res: Response, next: NextFunction){
        const {login, password} = req.body;
        console.log(req.body)
        console.log(login, password)
        const user = await user_repository.findOne({    
                where:{login}, 
                relations:{user_details:true, role:true}
            });
        if(!user){
            return res.status(400).json({message:'Пользователь не найден'});
        }
        const validatePassword = compareSync(password,user.password)
        if(!validatePassword){
            return res.status(400).json({message:'Пароль введен неверно'});
        }
        const token = genirateAccessToken(user);
        return res.json(token);
    }

    async getUsers(req: Request, res: Response){
        const users = user_repository.find({relations:{user_details: true}});
        res.status(200).json(users);
    }
}

export default new UserController();