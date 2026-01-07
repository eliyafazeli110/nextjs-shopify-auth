import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

export enum PhoneStep {
  Idle = "idle",
  EnterPhone = "enter-phone",
  CodeSent = "code-sent",
  Verifying = "verifying",
  Verified = "verified",
  Expired = "expired",
}

interface AuthUIState {
  phoneStep: PhoneStep
}

const initialState: AuthUIState = {
  phoneStep: PhoneStep.Idle,
}

const authUISlice = createSlice({
  name: "authUI",
  initialState,
  reducers: {
    startPhoneVerification(state) {
      state.phoneStep = PhoneStep.EnterPhone
    },
    phoneCodeSent(state) {
      state.phoneStep = PhoneStep.CodeSent
    },
    startVerifyingCode(state) {
      state.phoneStep = PhoneStep.Verifying
    },
    phoneVerified(state) {
      state.phoneStep = PhoneStep.Verified
    },
    phoneVerificationExpired(state) {
      state.phoneStep = PhoneStep.Expired
    },
    resetPhoneVerification(state) {
      state.phoneStep = PhoneStep.Idle
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
