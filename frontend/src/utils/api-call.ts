import { Effect, call, put } from 'redux-saga/effects'

import { FetchError } from './api-fetch'
import { navigate } from './history'
import { setNetworkErrorAction } from 'root/store/error/error.actions'

type Fn<T> = (...params: any[]) => Promise<T>

export function* apiCall<T>(fn: Fn<T>, ...args: any[]): Generator<Effect, T, T> {
  try {
    return yield call(fn, ...args)
  } catch (e) {
    if (e instanceof FetchError) {
      console.error(e.message)

      if (e.status === 401) {
        const currentUrl: URL = new URL(document.location.href)
        const loginUrl: URL = new URL(`/login`, currentUrl)
        yield call(navigate, loginUrl.toString())
      } else if (e.status === 403 || e.status === 404) {
        yield put(setNetworkErrorAction({ status: e.status, statusText: e.message, details: e }))
      }
    }
    throw e
  }
}
