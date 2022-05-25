import * as express from 'express';
import UserController from '../controller/user.controller';

const router = express.Router();

router.post('/registrate', UserController.registrate);
router.post('/authorize', UserController.authorize);

export default router;