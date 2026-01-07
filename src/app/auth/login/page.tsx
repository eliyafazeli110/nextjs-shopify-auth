"use client"
import LoginForm from "@/components/loginForm/LoginForm"
import { updatePhoneVerifyToken } from "@/Redux/authSlice"
import { useAppDispatch } from "@/Redux/hooks"

export default function loginPage() {
  const dispatch = useAppDispatch()
  const setPhoneVerifyToken = (token: string) => {
    dispatch(updatePhoneVerifyToken(token))
  }

  return <LoginForm setToken={setPhoneVerifyToken} />
}
