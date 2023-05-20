export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  birthDate: string
  firstName: string
  lastName: string
  country: string
}

export const registerFormRequiredField: Partial<Record<keyof RegisterFormData, boolean>> = {
  email: true,
  password: true,
  confirmPassword: true,
  birthDate: true,
  firstName: true,
  lastName: true,
  country: true
}
