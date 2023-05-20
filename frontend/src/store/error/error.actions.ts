import { createAction, EmptyAction, PayloadAction } from 'typesafe-actions'

import { LocalError, NetworkError } from './error.store'

export const setNetworkErrorAction: (
  error: NetworkError
) => PayloadAction<'error/set-network', NetworkError> =
  createAction('error/set-network')<NetworkError>()

export const setLocalErrorAction: (
  error: LocalError
) => PayloadAction<'error/set-local', LocalError> = createAction('error/set-local')<LocalError>()

export const resetErrorAction: () => EmptyAction<'error/reset'> = createAction('error/reset')()
