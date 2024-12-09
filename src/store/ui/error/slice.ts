import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
  error: string
}

export const initialState: State = {
  error: '',
}

const slice = createSlice({
  name: 'ui/error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | object>) => {
      if (action.payload instanceof Object) state.error = JSON.stringify(action.payload)
      else state.error = action.payload
    },
  },
})

export default slice
