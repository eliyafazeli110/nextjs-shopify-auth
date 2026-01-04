"use client"
import * as Yup from "yup"
import InnerLoginForm from "./InnerLoginForm"
import { withFormik } from "formik"
import { LoginFormValuesInterface } from "@/contracts/auth"

const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .required("وارد کردن شماره همراه ضروری است")
    .matches(/^[0-9]+$/, " لطفا فقط عدد وارد کنید")
    .length(11, "شماره موبایل باید ۱۱ رقم باشد")
    .matches(/^09[0-9]{9}$/, "فرمت شماره موبایل صحیح نیست (مثال: 09121234567)"),
})

interface LoginFormProps {
  setToken?: (token: string) => void
}

const Schema = withFormik<LoginFormProps, LoginFormValuesInterface>({
  validationSchema: loginSchema,
  mapPropsToValues: () => {
    return {
      phone: "",
    }
  },
  handleSubmit: async (values, { props, setFieldError }) => {
    console.log(values)
  },
})(InnerLoginForm)

const LoginForm = (props: LoginFormProps) => {
  return <Schema {...props} />
}

export default LoginForm
