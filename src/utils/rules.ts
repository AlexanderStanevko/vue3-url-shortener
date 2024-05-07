import validator from 'validator';

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
  if (!url) {
    return 'URL is required!';
  }

  if (!validator.isURL(url, {
    require_protocol: true,
    allow_underscores: true,
  })) {
    return 'Please enter a valid URL!';
  }

  return true;
};

export const urlFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  (val: string) => isValidUrl(val) || 'Please enter a valid URL!',
];

export const isValidPhone = (phone: string): string | true => {
  const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phonePattern.test(phone) || 'Please enter a valid phone number!';
};

export const phoneFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  isValidPhone,
];

export const isValidPassword = (password: string): string | true => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return (
    passwordPattern.test(password) ||
    'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character!'
  );
};

export const passwordFieldRules = [
  (val: string) => (val && val.length) || 'Field is required!',
  isValidPassword,
];
