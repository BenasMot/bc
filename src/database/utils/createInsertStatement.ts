import { camelCaseToSnakeCase } from './camelCaseToSnakeCase.ts';
import { ifStringWrapInBraces } from './ifStringWrapInBraces.ts';

export const createInsertStatement = <T extends Record<string, number | string>>(
  item: T,
  databaseName: string,
): string => {
  const keys = Object.keys(item).map(camelCaseToSnakeCase).map((s) => `'${s}'`);
  const values = Object.values(item).map(ifStringWrapInBraces);

  return `
  INSERT INTO ${databaseName} (
    ${keys.join(', ')}
  )
  VALUES (
    ${values.join(', ')}
  );
  `;
};
