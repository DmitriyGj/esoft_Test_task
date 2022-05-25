import { NextFunction, Request, Response } from 'express';
import DataSource  from '../db/datasource';
import {Role,} from '../db/entities';

class RoleController {
    role_repository = DataSource.getRepository(Role);

    async getOneByParams(params: Partial<Role>)  {
        const result = await this.role_repository.findOne({
            where:{...params}
        });
        return result;
    }

    async getWithParams(params: Partial<Role>)  {
        const result = await this.role_repository.find({
            where:{...params}
        });
        return result;
    }
}

export default new RoleController();