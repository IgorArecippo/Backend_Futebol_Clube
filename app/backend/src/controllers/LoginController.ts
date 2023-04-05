import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';
import { IPayload } from '../interfaces/ILogin';
import { IUserService } from '../interfaces/IUser';

const jwtSecret = process.env.JWT_SECRET || 'amomeucachorro';

export default class LoginController {
  private loginService: IUserService;

  constructor(loginService: IUserService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = await this.loginService.login(req.body);
      return res.status(200).json({ token: login });
    } catch (error) {
      next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    const { authorization } = req.headers;
    try {
      if (authorization) {
        const user = verify(authorization, jwtSecret as Secret) as IPayload;
        const { email } = user;
        const userRole = await this.loginService.getRole(email);
        return res.status(200).json(userRole);
      }
    } catch (error) {
      next(error);
    }
  }
}
