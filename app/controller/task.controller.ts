import DataBase from '../db/datasource';
import {Task, User} from '../db/entities';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Between, FindOptionsWhere, MoreThan } from 'typeorm';
import { Request, Response } from 'express';
import {verify} from 'jsonwebtoken';
import user_detailsController from './user_details.controller';
import { Status, Priority } from '../db/entities/Task.entity';

const task_repository = DataBase.getRepository(Task);
type Token = {info: User}

class TaskController {
    async getTasks(req: Request, res: Response, next){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        const result = await task_repository.find({
            where:{
                executor: user.user_details
            }, 
            order:{
                update_date: 'ASC'
            },
            relations:{executor:true,}
        });
        console.log(result)
        return res.status(200).json(result);
    }

    async getTasksOnToday(req:Request, res: Response, next){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        const date = new Date();
        console.log('hi')
        console.log(user.user_details)
        const result =  await task_repository.find({
                where:{
                    executor: user.user_details,
                    end_date: Between(startOfDay(date), endOfDay(date))
                },
                relations:{executor:true, creator:true}
            });

        return res.status(200).json(result);
    }

    async getTasksOnWeek(req:Request, res:Response, next){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        const startOfRange = new Date();
        const endOfRange = addDays(startOfRange, 7);

        const result = await task_repository.find({
                where:{
                    end_date:Between(startOfDay(startOfRange), endOfDay(endOfRange)),
                    executor: user.user_details
                },
                relations:{executor:true}
            });
        return res.status(200).json(result) 
    }

    async getTasksOnFuture(req:Request, res:Response, next){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        const startOfRange = addDays(startOfDay(new Date()),7);
        const result = await task_repository.find({
                where:{
                    end_date:MoreThan(startOfRange),
                    executor: user.user_details
                },
                relations:{executor:true}
            });
        console.log(result)
        return res.status(200).json(result) 
    }

    async postNewTask(req:Request, res:Response, next){
        const user = (verify(req.headers.authorization,'7') as Token).info;
        console.log(user)
        const creation_date = new Date().toDateString();
        const taskbody: Partial<Omit<Task, 'executor'> & {'executor_id':number}>  = req.body;
        const {priority, status} = taskbody;
        const executor = await user_detailsController.getOneUserDetailsByParams({user_details_id:taskbody.executor_id})
        const newTask = task_repository.create({...taskbody,
                                creator:user,
                                creation_date,
                                update_date:creation_date,
                                executor, 
                                priority:Priority[priority],
                                status: Status[status]});
        try{
            const result = await task_repository.save(newTask)
            res.json(result);
        }
        catch(e){
            console.log(e)
            return res.status(400).json({message:'Что-то пошло не так'});
        }
    }

    async putTask(req: Request, res: Response, next){
        try{
            const body: Partial<Task> & {'executor_id':number} = req.body;
            console.log(req.body)
            const {id} = req.params;
            const {status, priority, executor:executroFromBody, executor_id} = body;
            const update_date = new Date().toDateString();
            const task = await task_repository.findOne({where:{task_id:+id}});
            const executor = await user_detailsController.getOneUserDetailsByParams({user_details_id: executor_id })
            console.log(executor)
            const updatedTask = task_repository.create({...task,...body,
                                            status: status|| task.status, 
                                            priority: priority || task.priority,
                                            executor, 
                                            update_date })
            const result = await task_repository.save(updatedTask);
            
            res.status(200).json(result);
        }
        catch(e){
            console.log(e)
            res.status(400).json({message:'Что-то пошло не так'});
        }
    }

    async deleteTask(req: Request, res:Response, next){
        const {id} = req.params;
        const task = await task_repository.find({
            where:{
                task_id:+id
            }
        });
        try {
            const result = await task_repository.remove(task);
            return res.status(200).json(result);
        }
        catch(e){
            console.log(e);
            return res.status(400).json({message:'Что-то пошло не так'});
        }
    }

    async getTasksGroupedExecutors(req: Request, res:Response, next){
        try{
            const user = (verify(req.headers.authorization,'7') as Token).info;
            console.log(user)
            const tasks = await task_repository
                            .createQueryBuilder('Task')
                            .leftJoinAndSelect('Task.executor','user_details')
                            .where('user_details.supervisor_id = :supervisor_id', {supervisor_id:user.user_id})
                            .groupBy('Task.task_id, user_details.user_details_id').getMany()

            console.log(tasks)
            return res.status(200).json(tasks);
        }
        catch(e){
            console.log(e);
            return res.status(400);
        }
    }
}

export default new TaskController();