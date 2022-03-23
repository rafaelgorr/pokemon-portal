import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
  mode: 'light' | 'dark'
}

export const initialState: State = {
  mode: 'dark',
}

const slice = createSlice({
  name: 'ui/theme',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<State['mode']>) => {
      state.mode = action.payload
    },
  },
})

export default slice
