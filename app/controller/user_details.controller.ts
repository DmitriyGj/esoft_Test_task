import { NextFunction, Request, Response } from 'express';
import DataSource  from '../db/datasource';
import {Role, User_details,} from '../db/entities';
const user_detils_reopsitory =DataSource.getRepository(User_details);
class User_detailsController {

    async save(User_details){
        return await user_detils_reopsitory.save(User_details);
    }

    create(params: Partial<User_details>) {
        return user_detils_reopsitory.create({...params});
    }

    async delete(params:  User_details){
        return user_detils_reopsitory.remove({...params});
    }
}

export default new User_detailsController();