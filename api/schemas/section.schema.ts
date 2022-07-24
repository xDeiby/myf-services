import * as Yup from 'yup';

const id = Yup.number();
const name = Yup.string();
const description = Yup.string();
const experimentId = Yup.number();
const order = Yup.number();

export const sectionPostSchema = Yup.object({
  body: Yup.object({
    description,
    title: name.required('name is required'),
    experimentId: experimentId.required('experimentId is required'),
    order: order.required('order is required'),
  }),
});

export const sectionPutSchema = Yup.object({
  body: Yup.object({
    name,
    description,
    experimentId,
    order,
  }),
  params: Yup.object({
    id: id.required(),
  }),
});

export const sectionGetOrDelete = Yup.object({
  params: Yup.object({
    id: id.required(),
  }),
});
