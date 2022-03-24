import { DomainMove } from '@pokemon-portal/src/api/interfaces/Move'
import { fulfilledActions as moveFulfilledActions } from '@pokemon-portal/src/store/useCases/move'
import { WithEntityAdapter, WithEntityState } from '@pokemon-portal/utils/methods'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

type Adapters = {
  moves: DomainMove
}

export const adapters: WithEntityAdapter<Adapters> = {
  moves: createEntityAdapter<DomainMove>({
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
    builder.addCase(moveFulfilledActions.getMoveById, (state, action) => {
      adapters.moves.addOne(state.moves, action.payload)
    })
  },
})

export default session
