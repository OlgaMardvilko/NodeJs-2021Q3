import express from 'express';
import UsersController from '../controllers/users.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const usersRouter = express.Router();

usersRouter.get('/', authMiddleware, UsersController.getUsersList);
usersRouter.get('/:id', authMiddleware, UsersController.getUserById);
usersRouter.post('/', authMiddleware, UsersController.createUser);
usersRouter.post('/login', UsersController.login);
usersRouter.put('/:id', authMiddleware, UsersController.updateUser);
usersRouter.delete('/:id', authMiddleware, UsersController.removeUser);
