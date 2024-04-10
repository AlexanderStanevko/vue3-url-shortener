export const isValidEmail = (email: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

  return emailPattern.test(email);
};

export const emailFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  (val: string) => isValidEmail(val) || 'Please enter a valid email!',
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
  return urlPattern.test(url) || 'Please enter a valid URL!';
};

export const urlFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  isValidUrl,
];

export const isValidPhone = (phone: string): string | true => {
  const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phonePattern.test(phone) || 'Please enter a valid phone number!';
};

export const phoneFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  isValidPhone,
];
