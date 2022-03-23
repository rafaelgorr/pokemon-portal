import { adapters, State } from './slice'

export const getPokemons = (state: State) =>
  adapters.pokemons.getSelectors<State>((state) => state.pokemons).selectAll(state)
