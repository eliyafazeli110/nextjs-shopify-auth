import { configureStore } from "@reduxjs/toolkit"
import authUISlice from "./authUISlice"
import authSlice from "./authSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      authUI: authUISlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
