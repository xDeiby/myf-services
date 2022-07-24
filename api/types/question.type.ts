import { Optional } from 'sequelize';

export enum QuestionType {
  MULTIPLE = 'multiple',
  SELECT = 'select',
}

// All fields
export interface IQuestion {
  id: number;
  sectionId: number;
  question: string;
  type: QuestionType;
  order: number;
  required?: boolean;
  image?: string;
}

// Post params
export type IQuestionInput = Optional<
  IQuestion,
  'id' | 'required' | 'image' | 'type'
>;

// Return Type Post, Put, Get by Id
export type IQuestionOutput = Required<IQuestion>;
