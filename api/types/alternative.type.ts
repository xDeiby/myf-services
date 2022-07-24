import { Optional } from 'sequelize';

// All fields
export interface IAlternative {
  id: number;
  questionId: number;
  name: string;
  selected: boolean;
  correct: boolean;
  order: number;
}

// Post params
export type IAlternativeInput = Optional<
  IAlternative,
  'id' | 'selected' | 'correct'
>;

// Return Type Post, Put, Get by Id
export type IAlternativeOutput = Required<IAlternative>;
