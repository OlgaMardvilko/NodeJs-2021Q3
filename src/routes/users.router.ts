import express from 'express';
import UsersController from '../controllers/users.controller';
export const usersRouter = express.Router();

usersRouter.get('/', UsersController.getUsersList);
usersRouter.get('/:id', UsersController.getUserById);
usersRouter.post('/', UsersController.createUser);
usersRouter.put('/:id', UsersController.updateUser);
usersRouter.delete('/:id', UsersController.removeUser);
