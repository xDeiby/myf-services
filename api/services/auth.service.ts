import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IUser, IUserOutput, StatusCode } from '../types';
import { error, omitFields } from '../utils';
import { User } from '../../db/models/user.model';
import envConfig from '../../config/env.conf';

class AuthService {
  static async user(email: string, password: string): Promise<IUserOutput> {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) throw error('Unauthorized', StatusCode.UNAUTHORIZED);

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) throw error('Unauthorized', StatusCode.UNAUTHORIZED);

    return omitFields((user as any).dataValues, 'password');
  }

  static signToken(user: IUser): string {
    const payload = {
      sub: user.id,
    };
    const expiration = '10h';

    const token = jwt.sign(payload, envConfig.app.secret, {
      expiresIn: expiration,
    });

    return token;
  }
}

export default AuthService;
