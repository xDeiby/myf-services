import { Optional } from 'sequelize';

// All fields
export interface IUserExperimentRole {
  id: number;
  userId: number;
  experimentId: number;
}

// Post params
export type IUserExperimentRoleInput = Optional<IUserExperimentRole, 'id'>;

// Return Type Post, Put, Get by Id
export type IUserExperimentRoleOutput = Required<IUserExperimentRole>;
