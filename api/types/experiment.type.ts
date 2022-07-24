import { Optional } from 'sequelize';

export enum ExperimentStatus {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not_available',
}

// All fields
export interface IExperiment {
  id: number;
  title: string;
  description: string;
  status: ExperimentStatus;
  code: string;
  image?: string;
}

// Post params
export type IExperimentInput = Optional<
  IExperiment,
  'id' | 'code' | 'status' | 'image'
>;

// Return Type Post, Put, Get by Id
export type IExperimentOutput = IExperiment;
