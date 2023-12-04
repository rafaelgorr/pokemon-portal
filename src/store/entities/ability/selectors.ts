import { adapter, State } from './slice'

export const getAbilities = (state: State) =>
  adapter.getSelectors<State>((state) => state.abilities).selectAll(state)

export const getAbilitiesEntities = (state: State) =>
  adapter.getSelectors<State>((state) => state.abilities).selectEntities(state)
