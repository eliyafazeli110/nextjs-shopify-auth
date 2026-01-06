"use client"
import * as Yup from "yup"
import { InnerLoginForm } from "./InnerLoginForm"
import { useFormik } from "formik"
import callApi from "@/helper/callApi"
import ValidationError from "@/exception/validationError"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { phoneCodeSent, selectPhoneStep, startVerifyingCode } from "@/Redux/authUISlice"
import { useRouter } from "next/navigation"

const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("وارد کردن شماره همراه ضروری است")
    .matches(/^[0-9]+$/, " لطفا فقط عدد وارد کنید")
    .length(11, "شماره موبایل باید ۱۱ رقم باشد")
    .matches(/^09[0-9]{9}$/, "فرمت شماره موبایل صحیح نیست (مثال: 09121234567)"),
})

interface LoginFormProps {
  setToken: (token: string) => void
}

const LoginForm = (props: LoginFormProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const currentStep = useAppSelector(selectPhoneStep)

  const formik = useFormik({
    initialValues: { phone: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        dispatch(startVerifyingCode())

        const res = await callApi().post("/auth/login", values)

        if (res.status === 201 || res.status === 200) {
          props.setToken(res.data.token)

          dispatch(phoneCodeSent())

          router.push("/auth/login/phone-verify")
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          Object.entries(error.messages).forEach(([key, value]) => {
            const message = Array.isArray(value) ? value[0] : value
            setFieldError(key, message as string)
          })
        }
        alert(error)
        router.replace("/auth/register")
      }
    },
  })

  return <InnerLoginForm formik={formik} isVerifying={currentStep === "verifying"} />
}

export default LoginForm
