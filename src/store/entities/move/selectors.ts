import { adapters, State } from './slice'

export const getMoves = (state: State) =>
  adapters.moves.getSelectors<State>((state) => state.moves).selectAll(state)

export const getMoveEntities = (state: State) =>
  adapters.moves.getSelectors<State>((state) => state.moves).selectEntities(state)
