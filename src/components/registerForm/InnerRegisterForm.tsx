import { Form, FormikProps } from "formik"
import Input from "../shared/Input"
import Button from "../shared/Button"
import { RegisterFormValuesInterface } from "@/contracts/auth"

const InnerRegisterForm = (props: FormikProps<RegisterFormValuesInterface>) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <Form className="flex flex-col justify-center items-start text-center gap-6 p-4 rounded-xl w-100 h-auto bg-black border border-gray-700 text-white">
        <h1 className="text-4xl w-full my-auto mt-2">ثبت نام</h1>

        <Input
          textForTitle="نام"
          name="name"
          type="text"
          placeholder="لطفا نام کاربری را وارد نمایید"
        />
        <Input
          textForTitle="شماره موبایل"
          name="phone"
          type="text"
          placeholder="لطفا شماره موبایل خود را وارد نمایید"
        />

        <Button type="submit" text="ارسال" />
      </Form>
    </div>
  )
}
export default InnerRegisterForm
