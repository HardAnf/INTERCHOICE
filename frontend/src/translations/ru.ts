import { AuthResponseStatusCode } from 'root/shared/users'

const errorMessages = {
  [`errors.codes.${AuthResponseStatusCode.INCORRECT_DATA}`]: 'Неверные E-mail или пароль!'
}

export default {
  ...errorMessages
}
