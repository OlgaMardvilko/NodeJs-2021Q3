import { Request, Response } from 'express';
import * as GroupService from '../services/groups.service';
import { groupValidationSchema } from '../validations/group.schema';
import { ResponseCode, ResponseMessage } from '../common/common.consts';

const DEFAULT_LIMIT = 10;

const getGroupById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const group = await GroupService.getGroupById(id);

    if (group) {
      return res.status(ResponseCode.Success).send(group);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundGroup);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

const createGroup = async (req: Request, res: Response) => {
  const groupData = req.body;
  const validationRes = groupValidationSchema.validate(groupData);

  if (validationRes.error) {
    res.status(ResponseCode.BadRequest).send(validationRes.error.message);
  } else {
    try {
      const group = await GroupService.createGroup(groupData);

      if (group) {
        return res.status(ResponseCode.Created).send(group);
      }

      res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundGroup);
    } catch (e) {
      res.status(ResponseCode.ServiceError).send(e);
    }
  }
};

const updateGroup = async (req: Request, res: Response) => {
  const groupData = req.body;
  const id = req.params.id;
  const validationRes = groupValidationSchema.validate(groupData);

  if (validationRes.error) {
    res.status(ResponseCode.BadRequest).send(validationRes.error.message);
  } else {
    try {
      const group = await GroupService.updateGroup(groupData, id);

      if (group) {
        return res.status(ResponseCode.Success).send(group);
      }

      res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundGroup);
    } catch (e) {
      res.status(ResponseCode.ServiceError).send(e);
    }
  }
};

const getGroupsList = async (req: Request, res: Response) => {
  try {
    const groups = await GroupService.getAllGroups();

    if (groups) {
      return res.status(ResponseCode.Success).send(groups);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundGroups);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

const removeGroup = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const group = await GroupService.removeGroup(id);

    if (group) {
      return res.status(ResponseCode.Success).send(group);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundGroup);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

const addUsersToGroup = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userIds = req.body.users;

  try {
    const result = await GroupService.addUsersToGroup(id, userIds);

    if (result) {
      return res.status(ResponseCode.Success).send(result);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotAddedUsersToGroup);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

export default { getGroupById, createGroup, updateGroup, getGroupsList, removeGroup, addUsersToGroup };
