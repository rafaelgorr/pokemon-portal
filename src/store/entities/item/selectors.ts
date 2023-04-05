import { adapters, State } from './slice'

export const getAbilities = (state: State) =>
  adapters.abilities.getSelectors<State>((state) => state.abilities).selectAll(state)

export const getAbilitiesEntities = (state: State) =>
  adapters.abilities.getSelectors<State>((state) => state.abilities).selectEntities(state)
