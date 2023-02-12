import { FieldType, FieldValue } from 'https://deno.land/x/denodb@v1.2.0/lib/data-types.ts';

export type Fields<T> = {
  [field in keyof T]: FieldType;
};

export type FieldValues<T> = {
  [field in keyof T]: FieldValue;
};
