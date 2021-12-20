import { NextFunction, Request, Response } from 'express';
import { logger } from '../common/logger';
import { ResponseCode } from '../common/common.consts';
import { Config } from '../common/config';
import jwt from 'jsonwebtoken';

export const authMiddleware: (req: Request, res: Response, next: NextFunction) => void = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader: string | undefined = req.get('authorization');

  if (bearerHeader) {
    const [, bearerToken] = bearerHeader.split(' ');

    try {
      const jwtSecret: string = Config.JWT_SECRET as string;
      jwt.verify(bearerToken, jwtSecret);
      next();
    } catch (err) {
      logger.error(`${req.method}: ${req.path} => ${err}`);
      res.status(ResponseCode.Forbidden).send();
    }
  } else {
    res.status(ResponseCode.Unauthorized).send();
  }
};
