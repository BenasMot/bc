export const camelCaseToSnakeCase = (str: string): string => {
  return str.split('').map((letter) => {
    const isUppercase = letter === letter.toUpperCase();
    if (isUppercase) {
      return '_' + letter.toLowerCase();
    } else {
      return letter;
    }
  }).join('');
};