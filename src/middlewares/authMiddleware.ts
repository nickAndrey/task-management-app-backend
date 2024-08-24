import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ data: [], success: false, msg: 'Missed authorization header' });
  }

  const token = authorization.split('Bearer ').join('');
  const secret = process.env.JWT_SECRET || '';

  jwt.verify(token, secret, (err) => {
    if (err) {
      return res
        .status(403)
        .send({ data: [{ token }], success: false, msg: 'The token is invalid' });
    }

    next();
  });
};

export default authMiddleware;
