import { QuestionType } from '../../api/types';
import * as Yup from 'yup';

const id = Yup.number();
const question = Yup.string();
const type = Yup.mixed().oneOf(Object.values(QuestionType));
const order = Yup.number();
const sectionId = Yup.number();
const required = Yup.boolean();
const image = Yup.string();

export const questionPostSchema = Yup.object({
  body: Yup.object({
    question: question.required('question is required'),
    order: order.required('order is required'),
    sectionId: sectionId.required('sectionId is required'),
    type,
    required,
    image,
  }),
});

export const questionPutSchema = Yup.object({
  body: Yup.object({
    question,
    type,
    order,
    sectionId,
    required,
    image,
  }),
  params: Yup.object({
    id: id.required('id is required'),
  }),
});
