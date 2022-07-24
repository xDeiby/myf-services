import { IResolvers } from '@graphql-tools/utils';
import { IUser, StatusCode } from '../../api/types';

import { AuthService, UserService } from '../../api/services';
import { error } from '../../api/utils';

const userService = new UserService();

const UserResolvers: IResolvers = {
  Query: {
    listUsers: userService.list,
    findUser: userService.find,
    profile: async (_: any, data: any, ctx: any) => {
      if (!ctx.user?.sub) throw error('invalid token', StatusCode.UNAUTHORIZED);

      const user = await userService.profile(ctx.user.sub);
      return user;
    },
  },
  Mutation: {
    login: async (_: any, data: any) => {
      const user = await AuthService.user(data.email, data.password);
      const token = AuthService.signToken(user);

      return { user, token };
    },
    register: async (_: any, data: any) => {
      const user = await userService.create(data.user);
      const token = AuthService.signToken(user as IUser);

      return { user, token };
    },
    updateUser: userService.update,
    removeUser: userService.remove,
  },
};

export default UserResolvers;
