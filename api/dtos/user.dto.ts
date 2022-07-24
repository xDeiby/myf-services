import { IUser, IUserOutput } from '../types';

export type CreateUserDTO = Omit<IUserOutput, 'password'>;

export type GetUserDTO = Omit<IUser, 'password'>;
