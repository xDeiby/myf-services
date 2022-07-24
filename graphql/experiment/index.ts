import { createModule } from 'graphql-modules';
import 'graphql-import-node';

import ExperimentResolver from './experiment.resolver';
import * as experimentTypeDefs from './experiment.type.graphql';

const ExperimentModule = createModule({
  id: 'experiment-module',
  dirname: __dirname,
  typeDefs: [experimentTypeDefs],
  resolvers: ExperimentResolver,
});

export default ExperimentModule;
