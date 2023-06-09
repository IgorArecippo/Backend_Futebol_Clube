import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import UnauthorizedError from '../middlewares/midBadRequest';
import { IUser } from '../interfaces/IUser';
import Users from '../database/models/UsersModel';
import ILogin from '../interfaces/ILogin';

const jwtSecret = process.env.JWT_SECRET || 'amomeucachorro';

export default class LoginService {
  login = async (user: ILogin): Promise<string> => {
    console.log(user);
    // const { email } = user.email;
    // const { password } = user.password;
    const checkUser = await Users.findOne({ where: { email: user.email } });
    console.log(checkUser);
    if (!checkUser || !compareSync(user.password, checkUser.password)) {
      throw new UnauthorizedError('Invalid email or password');
    }
    // const checkPassword = compareSync(user.password, checkUser.password);
    // // if (!email || !password) {
    // //   throw new UnauthorizedError('All fields must be filled');
    // // }
    const jwtToken = this.generateToken(user, checkUser);
    return jwtToken;
  };

  private generateToken = async (_user: ILogin, checkUser: IUser): Promise<string> => {
    const payload = { id: checkUser.id, email: checkUser.email };
    const jwtToken = sign(payload, jwtSecret as string);
    return jwtToken;
  };

  getRole = async (email: string) => {
    const userRole = await Users.findOne({ where: { email } });
    if (userRole) {
      return { role: userRole.role };
    }
    return { role: 'not admin' };
  };
}
