import { Form } from "formik"
import Button from "../shared/Button"
import Input from "../shared/Input"

const InnerLoginForm = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-900">
      <Form className="flex flex-col justify-center items-start text-center gap-6 p-4 rounded-xl w-100 h-auto bg-black border border-gray-700 text-white">
        <h1 className="text-4xl w-full my-auto mt-2">ورود</h1>
        <Input
          textForTitle="شماره موبایل"
          name="phone"
          type="text"
          placeholder="لطفا شماره موبایل خود را وارد نمایید"
        />
        <Button type="submit" text="احراز هویت" />
      </Form>
    </div>
  )
}
export default InnerLoginForm
