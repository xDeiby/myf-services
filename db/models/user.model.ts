import {
  DataTypes,
  InitOptions,
  Model,
  ModelAttributes,
  Sequelize,
} from 'sequelize';

import { IUser, IUserInput } from '../../api/types';

export const USER_TABLE = 'users';

export class User extends Model<IUser, IUserInput> implements IUser {
  public id!: number;
  public name!: string;
  public userName!: string;
  public email!: string;
  public password!: string;
  public avatar?: string | undefined;

  static associate(models: any) {
    this.belongsToMany(models.Experiment, {
      as: 'experiments',
      through: models.UserExperimentRole,
      foreignKey: 'userId',
      otherKey: 'experimentId',
    });
  }

  static config(sequelize: Sequelize): InitOptions<User> {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      indexes: [
        {
          fields: ['username'],
        },
      ],
    };
  }
}

export const UserSchema: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userName: {
    allowNull: false,
    field: 'username',
    unique: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  avatar: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};
