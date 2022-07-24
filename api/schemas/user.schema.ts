import * as Yup from 'yup';

const id = Yup.number();
const name = Yup.string();
const email = Yup.string().email('invalid email');
const password = Yup.string().min(7, 'password must be have 7 characters');
const userName = Yup.string();

export const userPostSchema = Yup.object({
  body: Yup.object({
    email: email.required('email is required'),
    name: name.required('name is required'),
    password: password.required('password is required'),
    userName: userName.required('username is required'),
  }),
});

export const userPutSchema = Yup.object({
  body: Yup.object({
    email: email.required('email is required'),
    name: name.required('name is required'),
    password: password.required('password is required'),
    userName: userName.required('username is required'),
  }),
  params: Yup.object({
    id: id.required('id is required'),
  }),
});

export const userGetOrDeleteSchema = Yup.object({
  params: Yup.object({
    id: id.required('id is required'),
  }),
});
