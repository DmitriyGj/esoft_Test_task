import * as express from 'express';
import UserController from '../controller/user.controller';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/registrate', UserController.registrate);
router.post('/authorize', UserController.authorize);

export default router;