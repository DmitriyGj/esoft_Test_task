import * as express from 'express';
import UserRouter from './user.router';
import TasksRouter from './task.router';
const router = express.Router();

router.use('/users',UserRouter);
router.use('/tasks',TasksRouter);

export default router;