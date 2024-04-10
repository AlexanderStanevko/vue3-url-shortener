export const highlight = (string: string, search: string) => {
  const regExp = new RegExp(search, 'gi')
  const replacedString = string.replace(regExp, '<b>$&</b>')

  return replacedString
}
