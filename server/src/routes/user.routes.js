import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Posts
router.route('/users/register').post(UserController.registerUser);
router.route('/users/login').post(UserController.loginUser);

export default router;
