import { adapters, State } from './slice'

export const getPokemons = (state: State) =>
  adapters.pokemons.getSelectors<State>((state) => state.pokemons).selectAll(state)

export const getPokemonsEntities = (state: State) =>
  adapters.pokemons.getSelectors<State>((state) => state.pokemons).selectEntities(state)
