'use strict';

import { QueryInterface } from 'sequelize';
import { SectionSchema, SECTION_TABLE } from '../models/section.model';
import { QuestionSchema, QUESTION_TABLE } from '../models/question.model';
import {
  AlternativeSchema,
  ALTERNATIVE_TABLE,
} from '../models/alternative.model';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn(SECTION_TABLE, 'order', SectionSchema.order);
    await queryInterface.addColumn(
      QUESTION_TABLE,
      'image',
      QuestionSchema.image
    );
    await queryInterface.addColumn(
      QUESTION_TABLE,
      'order',
      QuestionSchema.order
    );
    await queryInterface.addColumn(QUESTION_TABLE, 'type', QuestionSchema.type);
    await queryInterface.addColumn(
      ALTERNATIVE_TABLE,
      'order',
      AlternativeSchema.order
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn(SECTION_TABLE, 'order');
    await queryInterface.removeColumn(QUESTION_TABLE, 'image');
    await queryInterface.removeColumn(QUESTION_TABLE, 'order');
    await queryInterface.removeColumn(QUESTION_TABLE, 'type');
    await queryInterface.removeColumn(ALTERNATIVE_TABLE, 'order');
  },
};
