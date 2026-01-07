"use client"
import VerificationForm from "@/components/phoneVerify/VerificationForm"
import { selectPhoneVerifyToken, updatePhoneVerifyToken } from "@/Redux/authSlice"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function phoneVerifyPage() {
  const router = useRouter()
  const token = useAppSelector(selectPhoneVerifyToken)
  const dispatch = useAppDispatch()

  const clearPhoneVerifyToken = async () => {
    await dispatch(updatePhoneVerifyToken(undefined))
  }

  useEffect(() => {
    window.addEventListener("popstate", async () => {
      await clearPhoneVerifyToken()
      return true
    })

    if (token == undefined) {
      router.push("/auth/login")
    }
  }, [token])

  return <VerificationForm token={token} clearToken={clearPhoneVerifyToken} />
}
