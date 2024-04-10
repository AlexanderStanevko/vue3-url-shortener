export const isValidEmail = (email: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

  return emailPattern.test(email);
};

export const emailFieldRules = [
  (val: string) => (val && val.length) || 'fieldRequired',
  (val: string) => isValidEmail(val) || 'invalidEmail',
];

export const isValidUrl = (url: string): string | true => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?' +
      '(\\/[-a-zA-Z\\d%_.~+]*)*' +
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
      '(\\#[-a-zA-Z\\d_]*)?$',
    'i'
  );
  return urlPattern.test(url) || 'Введите валидный URL!';
};

export const urlFieldRules = [
  (val: string) => (val && val.length) || 'Обязательное поле!',
  isValidUrl,
];
