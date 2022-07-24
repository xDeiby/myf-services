import {
  DataTypes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';

import { ISection, ISectionInput } from '../../api/types';
import { EXPERIMENT_TABLE } from './experiment.model';

export const SECTION_TABLE = 'sections';

export class Section
  extends Model<ISection, ISectionInput>
  implements ISection
{
  public id!: number;
  public experimentId!: number;
  public title!: string;
  public description!: string;
  public order!: number;

  static associate(models: any) {
    this.hasMany(models.Question, {
      as: 'questions',
      foreignKey: 'sectionId',
    });
  }

  static config(sequelize: Sequelize): InitOptions {
    return {
      sequelize,
      tableName: SECTION_TABLE,
      modelName: 'Section',
      timestamps: false,
    };
  }
}

export const SectionSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  experimentId: {
    field: 'experiment_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: EXPERIMENT_TABLE,
      key: 'id',
    },
  },
};
