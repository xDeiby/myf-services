'use strict';

import { QueryInterface } from 'sequelize';

import {
  AlternativeSchema,
  ALTERNATIVE_TABLE,
} from '../models/alternative.model';
import { EXPERIMENT_TABLE, ExperimentSchema } from '../models/experiment.model';
import { QuestionSchema, QUESTION_TABLE } from '../models/question.model';
import { SectionSchema, SECTION_TABLE } from '../models/section.model';
import { USER_TABLE, UserSchema } from '../models/user.model';
import {
  USER_EXPERIMENT_ROLE_TABLE,
  UserExperimentRoleSchema,
} from '../models/userExperimentsRole.model';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(USER_TABLE, UserSchema);
  await queryInterface.createTable(EXPERIMENT_TABLE, ExperimentSchema);
  await queryInterface.createTable(
    USER_EXPERIMENT_ROLE_TABLE,
    UserExperimentRoleSchema
  );
  await queryInterface.createTable(SECTION_TABLE, SectionSchema);
  await queryInterface.createTable(QUESTION_TABLE, QuestionSchema);
  await queryInterface.createTable(ALTERNATIVE_TABLE, AlternativeSchema);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(USER_EXPERIMENT_ROLE_TABLE);
  await queryInterface.dropTable(USER_TABLE);
  await queryInterface.dropTable(ALTERNATIVE_TABLE);
  await queryInterface.dropTable(QUESTION_TABLE);
  await queryInterface.dropTable(SECTION_TABLE);
  await queryInterface.dropTable(EXPERIMENT_TABLE);
}
