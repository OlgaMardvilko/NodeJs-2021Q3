import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger';
import { ResponseCode } from '../common/common.consts';

export const loggerMiddleware: (req: Request, res: Response, next: NextFunction) => void = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`${req.method}: ${req.path} => ${JSON.stringify(req.body)}`);
  next();
};

export const errorMiddleware: (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => void = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  logger.error(`${req.method}: ${req.path} => ${err}`);
  res.status(ResponseCode.ServiceError).send();
};
