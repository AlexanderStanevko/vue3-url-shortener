export const replaceAll = (string: string, search: string, replacement: string) => string
  .split(search)
  .join(replacement)
