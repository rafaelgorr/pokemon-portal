import { DomainListPokemon, DomainPokemon } from '@pokemon-portal/src/api/interfaces/domain/Pokemon'
import { fulfilledActions as pokemonFulfilledActions } from '@pokemon-portal/src/store/useCases/pokemon'
import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const adapter = createEntityAdapter<DomainPokemon | DomainListPokemon>({
  sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
})

export type State = {
  pokemons: EntityState<DomainPokemon | DomainListPokemon, string>
}

export const initialState: State = {
  pokemons: adapter.getInitialState(),
}

const session = createSlice({
  name: 'entities/pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pokemonFulfilledActions.getPokemons, (state, action) => {
      adapter.addMany(state.pokemons, action.payload)
    })
    builder.addCase(pokemonFulfilledActions.getPokemonById, (state, action) => {
      const pokemon = action.payload
      adapter.setOne(state.pokemons, pokemon)
    })
  },
})

export default session
