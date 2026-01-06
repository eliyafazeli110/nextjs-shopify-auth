import { FC } from "react"
import { useField } from "formik"

interface InputProps {
  name: string
  type?: string
  placeholder?: string
  errorClassName?: string
  textForTitle?: string
  disabled?: boolean
}

const Input: FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  errorClassName,
  textForTitle,
  disabled,
}) => {
  const [field, meta] = useField(name)

  const hasError = meta.touched && meta.error

  return (
    <div className="w-full flex flex-col gap-1">
      <h3 className="w-full text-start p-1">{textForTitle}</h3>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`w-full h-14 pl-10 pr-4 bg-gray-800 text-white border ${
          hasError ? "border-red-500" : "border-gray-700"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl text-[16px]`}
      />

      {hasError && (
        <div className={`font-Inter text-red-400 text-[14px] ${errorClassName ?? ""}`}>
          {meta.error}
        </div>
      )}
    </div>
  )
}

export default Input
