import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import {
  ExperimentStatus,
  IExperiment,
  IExperimentInput,
} from '../../api/types';

export const EXPERIMENT_TABLE = 'experiments';

export class Experiment
  extends Model<IExperiment, IExperimentInput>
  implements IExperiment
{
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: ExperimentStatus;
  public code!: string;
  public image?: string | undefined;

  static associate(models: any) {
    this.belongsToMany(models.User, {
      as: 'users',
      through: models.UserExperimentRole,
      foreignKey: 'experimentId',
      otherKey: 'userId',
    });

    this.hasMany(models.Section, {
      as: 'sections',
      foreignKey: 'experimentId',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'Experiment',
      tableName: EXPERIMENT_TABLE,
      timestamps: false,
      indexes: [{ fields: ['code'] }],
    };
  }
}

export const ExperimentSchema: ModelAttributes = {
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
    allowNull: false,
    type: DataTypes.TEXT,
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM(...Object.values(ExperimentStatus)),
    defaultValue: ExperimentStatus.AVAILABLE,
  },
  code: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};
