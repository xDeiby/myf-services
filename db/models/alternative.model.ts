import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { IAlternative, IAlternativeInput } from '../../api/types';
import { QUESTION_TABLE } from './question.model';

export const ALTERNATIVE_TABLE = 'alternatives';

export class Alternative
  extends Model<IAlternative, IAlternativeInput>
  implements IAlternative
{
  public id!: number;
  public questionId!: number;
  public name!: string;
  public selected!: boolean;
  public correct!: boolean;
  public order!: number;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ALTERNATIVE_TABLE,
      modelName: 'Alternative',
      timestamps: false,
    };
  }
}

export const AlternativeSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  selected: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  correct: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  questionId: {
    field: 'question_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: QUESTION_TABLE,
      key: 'id',
    },
  },
};
