import { DataTypes, Model, ModelAttributes, Sequelize } from 'sequelize';

import { IUserExperimentRole, IUserExperimentRoleInput } from '../../api/types';
import { EXPERIMENT_TABLE } from './experiment.model';
import { USER_TABLE } from './user.model';

export const USER_EXPERIMENT_ROLE_TABLE = 'users_experiments_role';

export class UserExperimentRole
  extends Model<IUserExperimentRole, IUserExperimentRoleInput>
  implements IUserExperimentRole
{
  public id!: number;
  public userId!: number;
  public experimentId!: number;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_EXPERIMENT_ROLE_TABLE,
      modelName: 'UserExperimentRole',
      timestamps: false,
    };
  }
}

export const UserExperimentRoleSchema: ModelAttributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id',
    },
  },
  experimentId: {
    allowNull: false,
    field: 'experiment_id',
    type: DataTypes.INTEGER,
    references: {
      model: EXPERIMENT_TABLE,
      key: 'id',
    },
  },
};
