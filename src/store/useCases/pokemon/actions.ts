import * as api from '@pokemon-portal/api/useCases/pokemon'
import { DomainPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { WithSuccess } from '@pokemon-portal/src/utils/methods'
import { getTypesThunkActions } from '@pokemon-portal/src/utils/redux'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const prefix = 'useCases/pokemon'

export const actions = {
  getPokemons: createAsyncThunk(
    `${prefix}/getPokemons`,
    async (input: api.GetPokemons['input'], thunkApi) => {
      try {
        const result = await api.getPokemons(input)
        // input?.onSuccess?.()
        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    }
  ),
  getPokemonById: createAsyncThunk(
    `${prefix}/getPokemonById`,
    async (input: WithSuccess<api.GetPokemonById['input'], DomainPokemon>, thunkApi) => {
      try {
        const result = await api.getPokemonById(input)
        input?.onSuccess?.(result)
        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    }
  ),
} as const
export const types = getTypesThunkActions(actions)

export const fulfilledActions = {
  getPokemons: createAction<api.GetPokemons['output']>(types.getPokemons.fulfilled),
  getPokemonById: createAction<api.GetPokemonById['output']>(types.getPokemonById.fulfilled),
}
