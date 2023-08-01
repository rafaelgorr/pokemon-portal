import { DomainListMove } from '@pokemon-portal/src/api/interfaces/domain/Move'
import { fulfilledActions as moveFulfilledActions } from '@pokemon-portal/src/store/useCases/move'
import { WithEntityAdapter, WithEntityState } from '@pokemon-portal/utils/methods'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

type Adapters = {
  moves: DomainListMove
}

export const adapters: WithEntityAdapter<Adapters> = {
  moves: createEntityAdapter<DomainListMove>({
    selectId: (pokemon) => pokemon.id,
    sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
  }),
} as const

export type State = WithEntityState<Adapters>

export const initialState: State = {
  moves: adapters.moves.getInitialState(),
}

const session = createSlice({
  name: 'entities/move',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveFulfilledActions.getMoves, (state, action) => {
      adapters.moves.addMany(state.moves, action.payload)
    })
    builder.addCase(moveFulfilledActions.getMoveById, (state, action) => {
      adapters.moves.setOne(state.moves, action.payload)
    })
  },
})

export default session
