import { FormikProvider } from "formik"
import Button from "../shared/Button"
import Input from "../shared/Input"

const InnerVerifyForm = ({ isVerifying, formik }: any) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-start text-center gap-6 p-4 rounded-xl w-100 h-auto bg-black border border-gray-700 text-white"
        >
          <Input
            textForTitle=""
            name="code"
            type="text"
            placeholder="کد ارسال شده را وارد نمایید"
          />
          <Button
            disabled={isVerifying}
            type="submite"
            text={isVerifying ? "در حال دریافت..." : "ادامه"}
          />
        </form>
      </FormikProvider>
    </div>
  )
}

export default InnerVerifyForm
