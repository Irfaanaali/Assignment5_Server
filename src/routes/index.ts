import { Router } from 'express';
import { userController } from '../controller/user.controller';

const router = Router();

router.post('/auth/registration', userController.createUser);
router.post('/auth/login', userController.logIn);

export default router;
