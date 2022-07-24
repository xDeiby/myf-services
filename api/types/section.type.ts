import { Optional } from 'sequelize';

// All fields
export interface ISection {
  id: number;
  order: number;
  experimentId: number;
  title: string;
  description: string;
}

// Post params
export type ISectionInput = Optional<ISection, 'id' | 'description'>;

// Return Type Post, Put, Get by Id
export type ISectionOutput = Required<ISection>;
