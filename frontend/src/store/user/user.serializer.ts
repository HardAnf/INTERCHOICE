import { RegisterFormData } from './user.types'
import { RegisterRequestPayload } from 'root/shared/users'

export const registerFormDataToResponsePayload = (
  formData: RegisterFormData
): RegisterRequestPayload => ({
  ...formData
})
