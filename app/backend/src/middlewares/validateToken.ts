import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import UnauthorizedError from './midBadRequest';

const jwtSecret = process.env.JWT_SECRET || 'amomeucachorro';
const authentication = (token: string): JwtPayload => {
  const payload = verify(token, jwtSecret as Secret);
  return payload as JwtPayload;
};

const validateToken: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Token not found');
  }
  const validToken = authentication(authorization);
  console.log(validToken);
  if (!validToken) {
    throw new UnauthorizedError('Token must be a valid token');
  }
  req.headers.userId = validToken.id;
  next();
};

export default validateToken;
