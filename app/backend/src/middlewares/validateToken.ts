import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import UnauthorizedError from './midBadRequest';

const jwtSecret = process.env.JWT_SECRET || 'amomeucachorro';
// const authentication = (token: string): JwtPayload => {
//   try {
//     const payload = verify(token, jwtSecret as Secret);
//   } catch (error) {
//     throw new UnauthorizedError('Token must be a valid token');
//   }
//   return payload as JwtPayload;
// };

const validateToken: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Token not found');
  }
  try {
    verify(authorization, jwtSecret as Secret);
    next();
  } catch (error) {
    throw new UnauthorizedError('Token must be a valid token');
  }
  // return payload as JwtPayload;
  // const validToken = authentication(authorization);
  // console.log(validToken);
  // if (!validToken || validToken.role !== 'admin') {
  //   throw new UnauthorizedError('Token must be a valid token');
  // }
  // req.headers.userId = validToken.id;
  // next();
};

export default validateToken;
