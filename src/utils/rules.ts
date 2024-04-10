export const isValidEmail = (email: string) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

  return emailPattern.test(email)
}

export const emailFieldRules = [
  (val: string) => (val && val.length) || 'fieldRequired',
  (val: string) => isValidEmail(val) || 'invalidEmail',
]
