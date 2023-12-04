import { DomainListMove } from '@pokemon-portal/src/api/interfaces/domain/Move'
import { fulfilledActions as moveFulfilledActions } from '@pokemon-portal/src/store/useCases/move'
import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const adapter = createEntityAdapter<DomainListMove>({
  sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
})

export type State = {
  moves: EntityState<DomainListMove, string>
}

export const initialState: State = {
  moves: adapter.getInitialState(),
}

const session = createSlice({
  name: 'entities/move',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveFulfilledActions.getMoves, (state, action) => {
      adapter.addMany(state.moves, action.payload)
    })
    builder.addCase(moveFulfilledActions.getMoveById, (state, action) => {
      adapter.setOne(state.moves, action.payload)
    })
  },
})

export default session
