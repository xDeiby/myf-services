import { IExperimentInput, IExperimentOutput, StatusCode } from '../types';
import { error } from '../utils';
import { Experiment } from '../../db/models/experiment.model';
import { UserExperimentRole } from '../../db/models/userExperimentsRole.model';
import { User } from '../../db/models/user.model';
import { Section } from '../../db/models/section.model';
import { Question } from '../../db/models/question.model';

export default class ExperimentService {
  async list(): Promise<IExperimentOutput[]> {
    const experiments = await Experiment.findAll();

    return experiments;
  }

  async find(
    id: number,
    query?: { relations: string }
  ): Promise<IExperimentOutput> {
    const experiment = await Experiment.findByPk(
      id,
      query?.relations === 'true'
        ? {
            include: {
              model: Section,
              as: 'sections',
              include: [
                {
                  model: Question,
                  as: 'questions',
                  include: ['alternatives'],
                },
              ],
            },
          }
        : {}
    );

    if (!experiment) throw error('experiment not found', StatusCode.NOT_FOUND);

    return experiment;
  }

  async create(
    data: IExperimentInput,
    userId: number
  ): Promise<IExperimentOutput> {
    const user = await User.findByPk(userId);

    if (!user) throw error('Unathorized user', StatusCode.UNAUTHORIZED);

    // TODO: Sacar
    data.code = Math.random().toString();
    const experiment = await Experiment.create(data);

    await UserExperimentRole.create({
      experimentId: experiment.id,
      userId: user.id,
    });

    return experiment;
  }

  async update(id: number, data: IExperimentInput): Promise<IExperimentOutput> {
    const experiment = await this.find(id);

    const updatedExperiment = await (experiment as Experiment).update(data);

    return updatedExperiment;
  }

  async remove(id: number): Promise<boolean> {
    const isRemoved = await Experiment.destroy({
      where: { id },
    });

    return Boolean(isRemoved);
  }
}
