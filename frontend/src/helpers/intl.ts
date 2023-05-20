import { createIntl, createIntlCache, IntlCache, IntlShape } from 'react-intl'
import { OptionalIntlConfig } from 'react-intl/dist/components/provider'

let cache: IntlCache | null
let intl: IntlShape

/**
 * Generate IntlShape object
 * @param {Object} props
 * @param {String} props.locale - User specified language
 * @param {Object} props.messages - Messages
 * @returns {Object}
 */
const generateIntl = (props: OptionalIntlConfig): IntlShape => {
  if (cache) {
    cache = null
  }

  cache = createIntlCache()

  intl = createIntl(props, cache)
  return intl
}

export const intlMessage = (messageId: string, defaultMessage?: string): string | undefined => {
  const message = intl.formatMessage({ id: messageId })
  return message != messageId ? message : defaultMessage ?? message
}

export { generateIntl, intl }
