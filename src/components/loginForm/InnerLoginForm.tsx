import { Form, FormikProvider } from "formik"
import Button from "../shared/Button"
import Input from "../shared/Input"

export const InnerLoginForm = ({ isVerifying, formik }: any) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-start text-center gap-6 p-4 rounded-xl w-100 h-auto bg-black border border-gray-700 text-white"
        >
          <h1 className="text-4xl w-full my-auto mt-2">ورود</h1>
          <Input
            textForTitle="شماره موبایل"
            name="phone"
            type="text"
            placeholder="لطفا شماره موبایل خود را وارد نمایید"
            disabled={isVerifying}
          />
          <Button
            type="submit"
            text={isVerifying ? "در حال ارسال..." : "احراز هویت"}
            disabled={isVerifying}
          />
        </form>
      </FormikProvider>
    </div>
  )
}
