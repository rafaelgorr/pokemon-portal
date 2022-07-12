import { DomainListPokemon, DomainPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { fulfilledActions as pokemonFulfilledActions } from '@pokemon-portal/src/store/useCases/pokemon'
import { WithEntityAdapter, WithEntityState } from '@pokemon-portal/utils/methods'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

type Adapters = {
  pokemons: DomainPokemon | DomainListPokemon
}

export const adapters: WithEntityAdapter<Adapters> = {
  pokemons: createEntityAdapter<DomainPokemon | DomainListPokemon>({
    selectId: (pokemon) => pokemon.id,
    sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
  }),
} as const

export type State = WithEntityState<Adapters>

export const initialState: State = {
  pokemons: adapters.pokemons.getInitialState(),
}

const session = createSlice({
  name: 'entities/pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pokemonFulfilledActions.getPokemons, (state, action) => {
      adapters.pokemons.addMany(state.pokemons, action.payload)
    })
    builder.addCase(pokemonFulfilledActions.getPokemonById, (state, action) => {
      const pokemon = action.payload
      adapters.pokemons.setOne(state.pokemons, pokemon)
    })
  },
})

export default session
