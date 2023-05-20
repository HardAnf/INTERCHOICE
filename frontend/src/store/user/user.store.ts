import { toast } from 'react-toastify'
import { Reducer } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import { errorMessage } from '../error/error.helpers'
import * as actions from './user.actions'
import { UserInfo } from 'root/shared/users'

export interface UserStore {
  value?: UserInfo | null
  loginPending: boolean
  userPending: boolean
  registerPending: boolean
  registerSuccess: boolean
  error: actions.LoginUserResponsePayload | null
}

const initialState: UserStore = {
  value: undefined,
  loginPending: false,
  userPending: false,
  registerPending: false,
  registerSuccess: false,
  error: null
}

export const userReducer: Reducer<UserStore, ActionType<typeof actions>> = (
  state = initialState,
  action
): UserStore => {
  switch (action.type) {
    case getType(actions.loginUser.request):
      return { ...initialState, loginPending: true }
    case getType(actions.loginUser.success):
      return { ...state, loginPending: false }
    case getType(actions.loginUser.failure):
    case getType(actions.registerUser.failure):
      toast(errorMessage(action.payload.statusCode, action.payload.message), { type: 'error' })
      return { ...state, error: action.payload, loginPending: false, registerPending: false }

    case getType(actions.registerUser.request):
      return { ...initialState, registerPending: true }
    case getType(actions.registerUser.success):
      return { ...initialState, registerSuccess: true }

    case getType(actions.currentUser.request):
      return { ...state, userPending: true }
    case getType(actions.currentUser.success):
      return { ...state, userPending: false, value: action.payload }
    case getType(actions.currentUser.failure):
      return { ...state, userPending: false, value: null }

    case getType(actions.logout.success):
      return { ...state, value: null }

    default:
      return state
  }
}
