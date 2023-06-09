import ILogin from './ILogin';

interface IUser extends ILogin {
  id: number,
  username: string,
}

interface IRole {
  role: string,
}

interface IUserService {
  login(user: ILogin): Promise<string>,
  getRole(authorization: string): Promise<IRole>
}

export { IUser, IRole, IUserService };
