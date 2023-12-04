import { StoreState } from '../..'
import { adapter } from './slice'

export const getPokemons = adapter.getSelectors<StoreState>(
  (state) => state.entities.pokemon.pokemons,
).selectAll

export const getPokemonsEntities = adapter.getSelectors?.<StoreState>(
  (state) => state.entities.pokemon.pokemons,
).selectEntities
