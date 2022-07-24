import { StatusCode } from '../types';

export const error = (message: string, code?: StatusCode): Error => {
  const err = new Error(message);
  if (code) (err as any).status = code;

  return err;
};
