import { Form, FormikProps, FormikProvider } from "formik"
import Input from "../shared/Input"
import Button from "../shared/Button"
import { RegisterFormValuesInterface } from "@/contracts/auth"

const InnerRegisterForm = ({ isVerifying, formik }: any) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-start text-center gap-6 p-4 rounded-xl w-100 h-auto bg-black border border-gray-700 text-white"
        >
          <h1 className="text-4xl w-full my-auto mt-2">ثبت نام</h1>

          <Input
            textForTitle="نام"
            name="name"
            type="text"
            placeholder="لطفا نام کاربری را وارد نمایید"
            disabled={isVerifying}
          />
          <Input
            textForTitle="شماره موبایل"
            name="phone"
            type="text"
            placeholder="لطفا شماره موبایل خود را وارد نمایید"
            disabled={isVerifying}
          />

          <Button type="submit" text="ارسال" disabled={isVerifying} />
        </form>
      </FormikProvider>
    </div>
  )
}
export default InnerRegisterForm
