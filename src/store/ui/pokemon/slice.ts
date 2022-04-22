import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
  selectedPokemonId: string
}

export const initialState: State = {
  selectedPokemonId: '',
}

const slice = createSlice({
  name: 'entities/drawer',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemonId = action.payload
    },
  },
})

export default slice
