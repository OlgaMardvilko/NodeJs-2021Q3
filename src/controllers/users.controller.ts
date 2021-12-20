import { Request, Response } from 'express';
import * as UserService from '../services/users.service';
import { userValidationSchema } from '../validations/user.schema';
import { ResponseCode, ResponseMessage } from '../common/common.consts';
import { logger } from '../common/logger';

const DEFAULT_LIMIT = 10;

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

    try {
      const jwtToken: string | null = await UserService.login(login, password);

      if (jwtToken) {
        res.status(ResponseCode.Success).send({ access_token: jwtToken });
      } else {
        res.status(ResponseCode.Unauthorized).send();
      }
    } catch (e) {
      logger.error(`login(${login}, ${password}): ${JSON.stringify(e)}`);
    }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await UserService.getUserById(id);

    if (user) {
      return res.status(ResponseCode.Success).send(user);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUser);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
    logger.error(`getUserById(${id}): ${JSON.stringify(e)}`);
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
      logger.error(`createUser(${userData}): ${JSON.stringify(e)}`);
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
      logger.error(`updateUser(${userData}, ${id}): ${JSON.stringify(e)}`);
    }
  }
};

const getUsersList = async (req: Request, res: Response) => {
  const loginSubstring = req.query.loginSubstring ? req.query.loginSubstring.toString() : '';
  const limit = Number(req.query.limit) || DEFAULT_LIMIT;

  try {
    const users = await UserService.getAutoSuggestUsers(loginSubstring, limit);

    if (users) {
      return res.status(ResponseCode.Success).send(users);
    }

    res.status(ResponseCode.NotFound).send(ResponseMessage.NotFoundUsers);
  } catch (e) {
    res.status(ResponseCode.ServiceError).send(e);
    logger.error(`getUsersList(${loginSubstring}): ${JSON.stringify(e)}`);
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
    logger.error(`getUsersList(${id}): ${JSON.stringify(e)}`);
  }
};

export default { login, getUserById, createUser, updateUser, getUsersList, removeUser };
