import { ApiResponse } from './api'

export interface LoginRequestPayload {
  email: string
  password: string
}

export enum AuthResponseStatusCode {
  INCORRECT_DATA = 130,
  SUCCESS = 2
}

export interface AuthResponse extends ApiResponse {
  statusCode: AuthResponseStatusCode
}

export interface UserInfo {
  email: string
  country: string
  birthDate: string
  firstName: string
  lastName: string
}

export interface RegisterRequestPayload {
  email: string
  password: string
  confirmPassword: string
  birthDate: string
  firstName: string
  lastName: string
  country: string
}
