import * as api from '@pokemon-portal/api/useCases/move'
import { WithSuccess } from '@pokemon-portal/src/utils/methods'
import { getTypesThunkActions } from '@pokemon-portal/src/utils/redux'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const prefix = 'useCases/pokemon'

export const actions = {
  getMoves: createAsyncThunk(
    `${prefix}/getMoves`,
    async (input: api.GetPokemonMoves['input'], thunkApi) => {
      try {
        const result = await api.getMoves(input)
        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    },
  ),
  getMoveById: createAsyncThunk(
    `${prefix}/getMoveById`,
    async (
      input: WithSuccess<
        api.GetPokemonMove['input'],
        api.GetPokemonMove['output']
      >,
      thunkApi,
    ) => {
      try {
        const result = await api.getMoveById(input)
        input?.onSuccess?.(result)
        return result
      } catch (e) {
        return thunkApi.rejectWithValue(e)
      }
    },
  ),
} as const
export const types = getTypesThunkActions(actions)

export const fulfilledActions = {
  getMoves: createAction<api.GetPokemonMoves['output']>(
    types.getMoves.fulfilled,
  ),
  getMoveById: createAction<api.GetPokemonMove['output']>(
    types.getMoveById.fulfilled,
  ),
}
