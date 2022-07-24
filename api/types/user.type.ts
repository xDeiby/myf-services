import { Optional } from 'sequelize';

// All fields
export interface IUser {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
}

// Post params
export type IUserInput = Optional<IUser, 'id' | 'avatar'>;

// Return Type Post, Put, Get by Id
export type IUserOutput = Required<IUser>;
