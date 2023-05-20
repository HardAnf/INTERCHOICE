import { toast } from 'react-toastify'
import { Action, combineReducers, Reducer } from 'redux'
import { createReducer, EmptyAction, PayloadAction } from 'typesafe-actions'

import { resetErrorAction, setLocalErrorAction, setNetworkErrorAction } from './error.actions'

export interface NetworkError {
  status: number
  statusText: string
  details: unknown
}

export interface LocalError {
  message: string
  details: unknown
}

export interface ErrorStore {
  networkError: NetworkError | null
  localError: LocalError | null
}

export const errorReducer: Reducer<ErrorStore> = combineReducers({
  networkError: createReducer<NetworkError | null, Action>(null)
    .handleAction(
      setNetworkErrorAction,
      (_: NetworkError | null, { payload }: PayloadAction<string, NetworkError>) => {
        toast(payload, { type: 'error' })
        return payload
      }
    )
    .handleAction(resetErrorAction, (_: NetworkError | null, __: EmptyAction<string>) => null),
  localError: createReducer<LocalError | null, Action>(null)
    .handleAction(
      setLocalErrorAction,
      (_: LocalError | null, { payload }: PayloadAction<string, LocalError>) => {
        toast(payload, { type: 'error' })
        return payload
      }
    )
    .handleAction(resetErrorAction, (_: LocalError | null, __: EmptyAction<string>) => null)
})
