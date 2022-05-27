import * as express from 'express';
import UserController from '../controller/user.controller';
import User_detailsController from '../controller/user_details.controller';
import {body, validationResult} from 'express-validator';
import authmiddleware from '../middleware/auth.middleware';
const router = express.Router();

router.post('/registrate', UserController.registrate);
router.post('/authorize', UserController.authorize);
router.get('/',authmiddleware, User_detailsController.getUsersDeatils)
export default router;