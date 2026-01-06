import ValidationError from "@/exception/validationError"
import axios from "axios"

const callApi = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true
      return config
    },
    (err) => {
      throw err
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      const res = err?.response
      if (res) {
        if (res.status === 422) {
          console.log(res.data)
          throw new ValidationError(res.data.errors)
        }
      }
      throw err
    }
  )

  return axiosInstance
}

export default callApi
