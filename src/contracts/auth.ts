export interface RegisterFormValuesInterface {
  name: string
  phone: string
}
export interface LoginFormValuesInterface {
  phone: string
}
export interface User {
  id: number
  name: string
}

export interface VerifyFormValueInterface {
  code: string
  token: string
}
