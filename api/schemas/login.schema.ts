import * as Yup from 'yup';

export const loginSchema = Yup.object({
  body: Yup.object({
    email: Yup.string().email('invalid email').required('email is required'),
    password: Yup.string().required('password is required'),
  }),
});
