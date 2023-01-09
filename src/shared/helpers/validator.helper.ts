export const validateEmail = (email: string): boolean => {
  const regexExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return regexExp.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password?.length > 5;
};

export const validateUsername = (password: string): boolean => {
  return password?.length > 2;
};