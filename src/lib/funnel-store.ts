import { create } from 'zustand'

export interface FunnelAnswers {
  timeline?: string
  guestCount?: string
  role?: string
  yourName?: string
  partnerName?: string
  email?: string
  phone?: string
  bestTimeToCall?: string
  tourDate?: string
  ceremonyOnSite?: string
  [key: string]: string | string[] | boolean | undefined
}

interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

interface FunnelState {
  currentStep: number
  totalSteps: number
  answers: FunnelAnswers
  utmParams: UTMParams
  direction: number
  setAnswer: <K extends keyof FunnelAnswers>(key: K, value: FunnelAnswers[K]) => void
  goNext: () => void
  goBack: () => void
  goToStep: (step: number) => void
  setUTMParams: (params: UTMParams) => void
  reset: () => void
}

export const useFunnelStore = create<FunnelState>((set) => ({
  currentStep: 0,
  totalSteps: 8,
  answers: {},
  utmParams: {},
  direction: 1,

  setAnswer: (key, value) =>
    set((state) => ({
      answers: { ...state.answers, [key]: value },
    })),

  goNext: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
      direction: 1,
    })),

  goBack: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
      direction: -1,
    })),

  goToStep: (step) =>
    set((state) => ({
      currentStep: step,
      direction: step > state.currentStep ? 1 : -1,
    })),

  setUTMParams: (params) => set({ utmParams: params }),

  reset: () => set({ currentStep: 0, answers: {}, direction: 1 }),
}))
