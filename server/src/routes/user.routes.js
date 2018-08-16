import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all Posts
router.route('/users').get(UserController.getUsers);
router.route('/users/user').get(UserController.getUser);
router.route('/users/register').post(UserController.registerUser);
router.route('/users/login').post(UserController.loginUser);
router.route('/users/logout').get(UserController.logoutUser);
router.route('/users/:userId').delete(UserController.deleteUser);


export default router;
