import { createAction, createAsyncAction } from 'typesafe-actions'
import {
  LoginRequestPayload,
  AuthResponse,
  RegisterRequestPayload,
  UserInfo
} from 'root/shared/users'

export interface LoginUserResponsePayload extends Partial<AuthResponse> {
  error?: unknown
}

export const loginUser = createAsyncAction(
  'LOGIN_USER/REQUEST',
  'LOGIN_USER/SUCCESS',
  'LOGIN_USER/FAILURE'
)<LoginRequestPayload, string, LoginUserResponsePayload>()

export const unlogin = createAction('UNLOGIN_USER')

export const currentUser = createAsyncAction(
  'CURRENT_USER/FETCH',
  'CURRENT_USER/SUCCESS',
  'CURRENT_USER/FAILURE'
)<void, UserInfo, void>()

export const fetchUsers = createAsyncAction(
  'FETCH_USERS/REQUEST',
  'FETCH_USERS/SUCCESS',
  'FETCH_USERS/FAILURE'
)<undefined, any, string>()

export const updateUser = createAsyncAction(
  'UPDATE_USER/REQUEST',
  'UPDATE_USER/SUCCESS',
  'UPDATE_USER/FAILURE'
)<any, any, void>()

export const registerUser = createAsyncAction(
  'REGISTER_USER/REQUEST',
  'REGISTER_USER/SUCCESS',
  'REGISTER_USER/FAILURE'
)<RegisterRequestPayload, string, LoginUserResponsePayload>()

export const deleteUser = createAsyncAction(
  'DELETE_USER/REQUEST',
  'DELETE_USER/SUCCESS',
  'DELETE_USER/FAILURE'
)<string, string, string>()

export const logout = createAsyncAction('LOGOUT/REQUEST', 'LOGOUT/SUCCESS', 'LOGOUT/FAILURE')<
  void,
  void,
  void
>()
