import DataBase from '../db/datasource';
import {Task, User} from '../db/entities';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Between, FindOperator, FindOptionsWhere, MoreThan, MoreThanOrEqual } from 'typeorm';
import { Request, Response } from 'express';
import {verify} from 'jsonwebtoken';
import user_detailsController from './user_details.controller';

const task_repository = DataBase.getRepository(Task);

class TaskController {
    async getTasksByParams(params: FindOptionsWhere<Task>) {
        return await task_repository.find({where:{...params}})
    }

    createTask(params: Partial<Task>){
        return task_repository.create(params);
    }

    async getOneByParams(params: Partial<Task>){
        return await task_repository.findOne({where:params})
    }

    async saveTask(task: Partial<Task>){
        return await task_repository.save(task);
    }

    async getTasksOnToday(req:Request, res: Response, next){
        const user = verify(req.headers.authorization,'7') as User;
        return await this.getTasksByParams({end_date: startOfDay(new Date()),executor:user.user_details});
    }

    async getTasksOnWeek(req:Request, res:Response, next){
        const user = verify(req.headers.authorization,'7') as User;
        const startOfRange = new Date();
        const endOfRange = addDays(startOfRange, 7);
        const result = await this.getTasksByParams({
                end_date:Between(startOfDay(startOfRange), endOfDay(endOfRange)),
                executor: user.user_details
            });
        return res.status(200).json(result) 
    }

    async getTasksOnFuture(req:Request, res:Response, next){
        const user = verify(req.headers.authorization,'7') as User;
        const startOfRange = addDays(startOfDay(new Date()),7);
        const result = await this.getTasksByParams({
            end_date:MoreThan(startOfRange),
            executor: user.user_details});
        return res.status(200).json(result) 
    }

    async postNewTask(req:Request, res:Response, next){
        const user = verify(req.headers.authorization,'7') as User;
        const taskbody: Partial<Task> = req.body;
        const executor = await user_detailsController.getOneUserDetailsByParams({user_details_id:taskbody.executor.user_details_id})
        const newTask = this.createTask({...taskbody,creator:user, executor});
        try{
            const result = await this.saveTask(newTask)
            res.json(result);
        }
        catch(e){
            return res.status(400).json({message:'Что-то пошло не так'});
        }
    }

    async putTask(req: Request, res: Response, next){
        try{
            const body: Partial<Task> = req.body;
            const update_date = new Date().toDateString();
            const task = await this.getOneByParams({task_id:body.task_id});
            const updatedTask = this.createTask({...task,...body, update_date })
            this.saveTask(updatedTask);
        }
        catch(e){
            res.status(400).json({message:'Что-то пошло не так'})
        }
    }

    async deleteTask(req: Request, res:Response, next){
        const task: Task = req.body
        try {
            const result = await task_repository.remove(task);
            return res.status(200).json(result);
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message:'Что-то пошло не так'});
        }
    }
}

export default new TaskController();