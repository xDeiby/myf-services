export const omitFields = <T>(data: T, ...fields: (keyof T)[]) => {
  fields.forEach((field) => {
    delete data[field];
  });

  return data;
};
