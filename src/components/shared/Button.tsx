import { FC } from "react"

interface ButtonProps {
  type: string
  text: string
  disabled: boolean
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <>
      <button
        type="submit"
        className="w-full h-14 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-lg rounded-xl shadow-lg hover:shadow-blue-500/30"
      >
        {text}
      </button>
    </>
  )
}
export default Button
