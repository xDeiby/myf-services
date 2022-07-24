import { Sequelize } from 'sequelize';
import { Alternative, AlternativeSchema } from './alternative.model';
import { Experiment, ExperimentSchema } from './experiment.model';
import { Question, QuestionSchema } from './question.model';
import { Section, SectionSchema } from './section.model';
import { User, UserSchema } from './user.model';
import {
  UserExperimentRole,
  UserExperimentRoleSchema,
} from './userExperimentsRole.model';

const setupModels = (sequelize: Sequelize) => {
  // Init Models
  User.init(UserSchema, User.config(sequelize));
  Experiment.init(ExperimentSchema, Experiment.config(sequelize));
  Section.init(SectionSchema, Section.config(sequelize));
  Section.init(SectionSchema, Section.config(sequelize));
  Question.init(QuestionSchema, Question.config(sequelize));
  Alternative.init(AlternativeSchema, Alternative.config(sequelize));
  UserExperimentRole.init(
    UserExperimentRoleSchema,
    UserExperimentRole.config(sequelize)
  );

  // Associations
  User.associate(sequelize.models);
  Experiment.associate(sequelize.models);
  Section.associate(sequelize.models);
  Question.associate(sequelize.models);
};

export default setupModels;
