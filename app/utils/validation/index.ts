export function validateLogin(str: string) {
  if (str.length < 1) {
    return 'Поле необходимо заполнить';
  }

  return str.length > 7 ? '' : 'Введите не менее 8 символов';
}

export function validatePassword(str: string) {
  if (str.length < 1) {
    return 'Поле необходимо заполнить';
  }
  const valid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(str);
  return valid
    ? ''
    : 'Введите не менее 8 символов, 1 заглавную букву и 1 цифру';
}

export function validateVerifiedPassword(pas: string, verPas: string) {
  return pas !== verPas ? 'Введенные пароли не совпадают' : '';
}
