import express from 'express';
import GroupController from '../controllers/groups.controller';
export const groupsRouter = express.Router();

groupsRouter.get('/', GroupController.getGroupsList);
groupsRouter.get('/:id', GroupController.getGroupById);
groupsRouter.post('/', GroupController.createGroup);
groupsRouter.post('/:id/add-users', GroupController.addUsersToGroup);
groupsRouter.put('/:id', GroupController.updateGroup);
groupsRouter.delete('/:id', GroupController.removeGroup);
