import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { IQuestion, IQuestionInput, QuestionType } from '../../api/types';
import { SECTION_TABLE } from './section.model';

export const QUESTION_TABLE = 'questions';

export class Question
  extends Model<IQuestion, IQuestionInput>
  implements IQuestion
{
  public id!: number;
  public sectionId!: number;
  public question!: string;
  public type!: QuestionType;
  public order!: number;
  public required?: boolean | undefined;
  public image?: string | undefined;

  static associate(models: any) {
    this.hasMany(models.Alternative, {
      as: 'alternatives',
      foreignKey: 'questionId',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: QUESTION_TABLE,
      modelName: 'Question',
      timestamps: false,
    };
  }
}

export const QuestionSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  question: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  required: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  type: {
    allowNull: true,
    type: DataTypes.ENUM(...Object.values(QuestionType)),
    defaultValue: QuestionType.SELECT,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sectionId: {
    field: 'section_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: SECTION_TABLE,
      key: 'id',
    },
  },
};
