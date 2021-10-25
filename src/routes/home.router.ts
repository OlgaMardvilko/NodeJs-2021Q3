import { ResponseCode, ResponseMessage } from 'common/common.const';
import express, { Request, Response } from 'express';
export const homeRouter = express.Router();

const homeRoute = (req: Request, res: Response) => {
  res.status(ResponseCode.Success).send({ message: ResponseMessage.HomePageSuccess });
};

homeRouter.get('/', homeRoute);
