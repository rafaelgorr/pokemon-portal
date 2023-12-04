import { adapter, State } from './slice'

export const getMoves = (state: State) =>
  adapter.getSelectors<State>((state) => state.moves).selectAll(state)

export const getMoveEntities = (state: State) =>
  adapter.getSelectors<State>((state) => state.moves).selectEntities(state)
