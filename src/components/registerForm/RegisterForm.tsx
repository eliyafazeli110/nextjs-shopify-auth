"use client"
import * as Yup from "yup"
import InnerRegisterForm from "./InnerRegisterForm"
import { useFormik, withFormik } from "formik"
import { RegisterFormValuesInterface } from "@/contracts/auth"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks"
import { phoneCodeSent, selectPhoneStep } from "@/Redux/authUISlice"
import callApi from "@/helper/callApi"
import ValidationError from "@/exception/validationError"

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "تعداد کاراکتر نام کاربری شما باید بیشتر از ۳ حرف باشد")
    .max(20, "تعداد کاراکتر های نام کاربری شما باید کمتر از ۲۰ حرف باشد")
    .required("انتخاب نام کاربری ضروری است"),
  phone: Yup.string()
    .required("وارد کردن شماره همراه ضروری است")
    .matches(/^[0-9]+$/, " لطفا فقط عدد وارد کنید")
    .length(11, "شماره موبایل باید ۱۱ رقم باشد")
    .matches(/^09[0-9]{9}$/, "فرمت شماره موبایل صحیح نیست (مثال: 09121234567)"),
})

interface RegisterFormProps {
  phone: string
  name: string
}

const RegisterForm = (props: RegisterFormProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const currentStep = useAppSelector(selectPhoneStep)

  const formik = useFormik({
    initialValues: { name: "", phone: "" },
    validationSchema: signupSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await callApi().post("/auth/register", values)
        if (res.status === 201 || res.status === 200) {
          dispatch(phoneCodeSent())
          console.log(values)
          router.push("/auth/login")
        }
      } catch (error) {
        if (error instanceof ValidationError) {
          Object.entries(error.messages).forEach(([key, value]) => {
            const message = Array.isArray(value) ? value[0] : value
            setFieldError(key, message as string)
          })
        }
      }
    },
  })

  return <InnerRegisterForm formik={formik} isVerifying={currentStep === "verifying"} />
}

export default RegisterForm
