import { ExperimentStatus } from '../../api/types';
import * as Yup from 'yup';

const id = Yup.number();
const title = Yup.string();
const description = Yup.string();
const status = Yup.mixed().oneOf(Object.values(ExperimentStatus));
const relations = Yup.boolean();

export const experimentPostSchema = Yup.object({
  body: Yup.object({
    title: title.required('title is required'),
    description: description.required('description is required'),
    status,
  }),
});

export const experimentPutSchema = Yup.object({
  body: Yup.object({
    title,
    description,
    status,
  }),
  params: Yup.object({
    id: id.required(),
  }),
});

export const experimentGetOrDeleteSchema = Yup.object({
  params: Yup.object({
    id: id.required(),
  }),
  query: Yup.object({
    relations,
  }),
});
