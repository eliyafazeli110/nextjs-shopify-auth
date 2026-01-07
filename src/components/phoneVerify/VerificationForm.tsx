"use client"
import { useFormik } from "formik"
import * as Yup from "yup"
import InnerVerifyForm from "./InnerVerifyForm"
import callApi from "@/helper/callApi"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { selectPhoneVerifyToken } from "@/Redux/authSlice"
import {
  phoneCodeSent,
  PhoneStep,
  phoneVerified,
  resetPhoneVerification,
  selectPhoneStep,
  startVerifyingCode,
} from "@/Redux/authUISlice"
import { VerifyFormValueInterface } from "@/contracts/auth"
import ValidationError from "@/exception/validationError"
import { storeLoginToken } from "@/helper/auth"

const verifySchema = Yup.object().shape({
  code: Yup.string()
    .required("وارد کردن کد الزامی است")
    .length(6, "کد تایید باید ۶ رقم باشد")
    .matches(/^[0-9]+$/, "لطفا فقط عدد وارد کنید"),
})

interface VerfyPageProps {
  token?: string
  clearToken: () => void
}

const VerificationForm = (props: VerfyPageProps) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const token = useAppSelector(selectPhoneVerifyToken)
  const currentStep = useAppSelector(selectPhoneStep)

  const formik = useFormik<VerifyFormValueInterface>({
    initialValues: {
      code: "",
      token: token || "",
    },
    enableReinitialize: true,
    validationSchema: verifySchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        dispatch(startVerifyingCode())
        const res = await callApi().post("/auth/login/verify-phone", values)

        if (res.status === 200) {
          storeLoginToken(res.data?.user?.token)
          await props.clearToken()
          dispatch(phoneVerified())

          router.push("/admin")
        }
      } catch (error) {
        dispatch(phoneCodeSent())
        resetForm()

        if (error instanceof ValidationError) {
          Object.entries(error.messages).forEach(([key, value]) => {
            const message = Array.isArray(value) ? value[0] : value
            setFieldError(key, message as string)
          })
        }
        alert("کد وارد شده نامعتبر بود")
      }
    },
  })

  return <InnerVerifyForm formik={formik} isVerifying={currentStep === PhoneStep.Verifying} />
}
export default VerificationForm
