import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { FindOptionsWhere } from 'typeorm';
import DataSource  from '../db/datasource';
import { User, User_details,} from '../db/entities';

const user_detils_reopsitory =DataSource.getRepository(User_details);

type Token = {info: User}

class User_detailsController {

    async save(User_details: User_details){
        return await user_detils_reopsitory.save(User_details);
    }

    create(params: Partial<User_details>) {
        return user_detils_reopsitory.create({...params});
    }

    async getOneUserDetailsByParams(params: FindOptionsWhere<User_details>){
        return await user_detils_reopsitory.findOne({where:{...params}})
    }

    async delete(params:  User_details){
        return user_detils_reopsitory.remove({...params});
    }

    async getUsersDeatils(req: Request, res: Response){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        const users_details = await user_detils_reopsitory.find({where:{supervisor:user}});
        return res.status(200).json(users_details);
    }
}

export default new User_detailsController();