import * as api from '@pokemon-portal/api/useCases/pokemon'
import { WithSuccess } from '@pokemon-portal/src/utils/methods'
import { getTypesThunkActions } from '@pokemon-portal/src/utils/redux'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const prefix = 'useCases/pokemon'

export const pokemonAsyncActions = {
  getPokemons: createAsyncThunk(
    `${prefix}/getPokemons`,
    async (input: WithSuccess<api.GetPokemons['input'], boolean> | undefined, thunkApi) => {
      try {
        const result = await api.getPokemons(input)
        input?.onSuccess?.(result.length !== input.limit)

        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    }
  ),
  getPokemonById: createAsyncThunk(
    `${prefix}/getPokemonById`,
    async (input: api.GetPokemonById['input'], thunkApi) => {
      try {
        const result = await api.getPokemonById(input)
        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    }
  ),
} as const
export const types = getTypesThunkActions(pokemonAsyncActions)

export const fulfilledActions = {
  getPokemons: createAction<api.GetPokemons['output']>(types.getPokemons.fulfilled),
  getPokemonById: createAction<api.GetPokemonById['output']>(types.getPokemonById.fulfilled),
}
