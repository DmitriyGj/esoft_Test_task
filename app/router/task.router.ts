import * as express from 'express';
import TaskController from '../controller/task.controller';
import authmiddleware from '../middleware/auth.middleware';
import rolemiddleware from '../middleware/role.middleware';

const router = express.Router();

router.get('/',authmiddleware, TaskController.getTasks);
router.get('/today', authmiddleware, TaskController.getTasksOnToday);
router.get('/onweek',authmiddleware, TaskController.getTasksOnWeek);
router.get('/onfuture', authmiddleware, TaskController.getTasksOnFuture);

router.get('/forsupervisor',
        [authmiddleware, rolemiddleware(['Руководитель'])],
        TaskController.getTasksGroupedExecutors);

router.post('/',authmiddleware , TaskController.postNewTask);
router.delete('/:id', authmiddleware, TaskController.deleteTask);
router.put('/:id',authmiddleware, TaskController.putTask )


export default router;