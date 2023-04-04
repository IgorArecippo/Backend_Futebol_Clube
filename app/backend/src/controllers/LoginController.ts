import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/IUser';

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
    console.log(req.headers);
    try {
      const { userId, authorization } = req.headers;
      const id = parseFloat(userId as string);
      const userRole = await this.loginService.getRole(id, authorization);
      return res.status(200).json(userRole);
    } catch (error) {
      next(error);
    }
  }
}
