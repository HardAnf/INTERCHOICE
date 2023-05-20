export const required = (value: string): string | undefined =>
  value ? undefined : 'Поле обязательно для заполнения'

export const comparePasswords = (password: string, repeatPassword: string): string | undefined =>
  password === repeatPassword ? undefined : 'Пароли должны совпадать'
