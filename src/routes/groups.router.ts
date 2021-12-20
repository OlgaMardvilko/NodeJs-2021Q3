import express from 'express';
import GroupController from '../controllers/groups.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

export const groupsRouter = express.Router();

groupsRouter.get('/', authMiddleware, GroupController.getGroupsList);
groupsRouter.get('/:id', authMiddleware, GroupController.getGroupById);
groupsRouter.post('/', authMiddleware, GroupController.createGroup);
groupsRouter.post('/:id/add-users', authMiddleware, GroupController.addUsersToGroup);
groupsRouter.put('/:id', authMiddleware, GroupController.updateGroup);
groupsRouter.delete('/:id', authMiddleware, GroupController.removeGroup);
