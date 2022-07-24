import { IResolvers } from '@graphql-tools/utils';
import { StatusCode } from '../../api/types';
import { error } from '../../api/utils';
import { ExperimentService } from '../../api/services';

const experimentServices = new ExperimentService();

const experimentResolver: IResolvers = {
  Query: {
    listExperiments: experimentServices.list,
    findExperiment: experimentServices.find,
  },
  Mutation: {
    createExperiment: (_: any, data: any, ctx: any) => {
      if (!ctx.user?.sub) throw error('invalid token', StatusCode.UNAUTHORIZED);

      return experimentServices.create(data.experiment, ctx.user.sub);
    },
  },
};

export default experimentResolver;
