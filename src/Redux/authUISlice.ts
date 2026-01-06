import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

export type PhoneVerificationStep =
  | "idle"
  | "enter-phone"
  | "code-sent"
  | "verifying"
  | "verified"
  | "expired"

interface AuthUIState {
  phoneStep: PhoneVerificationStep
}

const initialState: AuthUIState = {
  phoneStep: "idle",
}

const authUISlice = createSlice({
  name: "authUI",
  initialState,
  reducers: {
    startPhoneVerification(state) {
      state.phoneStep = "enter-phone"
    },
    phoneCodeSent(state) {
      state.phoneStep = "code-sent"
    },
    startVerifyingCode(state) {
      state.phoneStep = "verifying"
    },
    phoneVerified(state) {
      state.phoneStep = "verified"
    },
    phoneVerificationExpired(state) {
      state.phoneStep = "expired"
    },
    resetPhoneVerification(state) {
      state.phoneStep = "idle"
    },
  },
})

export const {
  startPhoneVerification,
  phoneCodeSent,
  startVerifyingCode,
  phoneVerified,
  phoneVerificationExpired,
  resetPhoneVerification,
} = authUISlice.actions

export const selectPhoneStep = (state: RootState) => state.authUI.phoneStep

export default authUISlice.reducer
