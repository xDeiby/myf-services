import { createModule } from 'graphql-modules';
import 'graphql-import-node';

import UserResolvers from './user.resolver';
import * as userTypeDefs from './user.type.graphql';

const UserModule = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [userTypeDefs],
  resolvers: UserResolvers,
});

export default UserModule;
