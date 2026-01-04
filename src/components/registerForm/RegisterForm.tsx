"use client"
import * as Yup from "yup"
import InnerRegisterForm from "./InnerRegisterForm"
import { withFormik } from "formik"
import { RegisterFormValuesInterface } from "@/contracts/auth"

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

const EnhanceForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>({
  validationSchema: signupSchema,
  mapPropsToValues: () => {
    return {
      name: "",
      phone: "",
    }
  },
  handleSubmit: async (values, { setFieldError }) => {
    console.log(values)
  },
})(InnerRegisterForm)

const RegisterForm = (props: RegisterFormProps) => {
  return <EnhanceForm {...props} />
}

export default RegisterForm
