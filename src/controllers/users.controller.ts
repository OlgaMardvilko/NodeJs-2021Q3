import { Request, Response } from 'express';
import * as UserService from '../services/users.service';
import { userValidationSchema } from '../validations/user.schema';
import { ResponseCode, ResponseMessage } from '../common/common.const';

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserService.getUserById(id);

    if (user) {
      return res.status(ResponseCode.Success).send(user);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUser);
  } catch (e) {
    res.status(500).send(e);
  }
};

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const validationRes = userValidationSchema.validate(userData);

  if (validationRes.error) {
    res.status(ResponseCode.BadRequest).send(validationRes.error.message);
  } else {
    try {
      const user = await UserService.createUser(userData);

      if (user) {
        return res.status(ResponseCode.Created).send(user);
      }

      res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUser);
    } catch (e) {
      res.status(ResponseCode.ServiceError).send(e);
    }
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const id = req.params.id;
  const validationRes = userValidationSchema.validate(userData);

  if (validationRes.error) {
    res.status(ResponseCode.BadRequest).send(validationRes.error.message);
  } else {
    try {
      const user = await UserService.updateUser(userData, id);

      if (user) {
        return res.status(ResponseCode.Success).send(user);
      }

      res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUser);
    } catch (e) {
      res.status(ResponseCode.ServiceError).send(e);
    }
  }
};

const getUsersList = async (req: Request, res: Response) => {
  const loginSubstring = req.query.loginSubstring ? req.query.loginSubstring.toString() : '';
  const limit = Number(req.query.limit) || 10;

  try {
    const users = await UserService.getAutoSuggestUsers(loginSubstring, limit);

    if (users) {
      return res.status(ResponseCode.Success).send(users);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUsers);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

const removeUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserService.removeUser(id);

    if (user) {
      return res.status(ResponseCode.Success).send(user);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUser);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
  }
};

export default { getUserById, createUser, updateUser, getUsersList, removeUser };
