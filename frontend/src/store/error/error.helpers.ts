import { intlMessage } from 'root/helpers/intl'

export const errorMessage = (errorCode?: unknown, defaultMessage?: string): string | undefined => {
  return intlMessage(`errors.codes.${String(errorCode)}`, defaultMessage)
}
