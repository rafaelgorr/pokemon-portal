import { createSlice } from '@reduxjs/toolkit'

export interface State {
  drawerOpen: boolean
}

export const initialState: State = {
  drawerOpen: false,
}

const slice = createSlice({
  name: 'entities/drawer',
  initialState,
  reducers: {
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen
    },
  },
})

export default slice
