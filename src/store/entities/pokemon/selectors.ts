import { adapter } from './slice'
import { StoreState } from '../..'

export const getPokemons = adapter.getSelectors<StoreState>((state) => state.entities.pokemon.pokemons).selectAll

export const getPokemonsEntities = adapter.getSelectors?.<StoreState>(
  (state) => state.entities.pokemon.pokemons,
).selectEntities
