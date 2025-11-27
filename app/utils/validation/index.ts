export function validatePassword(str: string) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(str);
}

export function validateLogin(str: string) {
  return str.length > 7;
}
