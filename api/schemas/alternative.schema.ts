import * as Yup from 'yup';

const id = Yup.number();
const name = Yup.string();
const questionId = Yup.number();
const selected = Yup.boolean();
const correct = Yup.boolean();
const order = Yup.number();

export const alternativePostSchema = Yup.object({
  body: Yup.object({
    name: name.required('name is required'),
    order: order.required('order is required'),
    questionId: questionId.required('questionId is required'),
    selected,
    correct,
  }),
});

export const alternativePutSchema = Yup.object({
  body: Yup.object({
    name,
    order,
    questionId,
    selected,
    correct,
  }),
  params: Yup.object({
    id: id.required('id is required'),
  }),
});
