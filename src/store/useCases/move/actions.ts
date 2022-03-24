import * as api from '@pokemon-portal/api/useCases/move'
import { WithSuccess } from '@pokemon-portal/src/utils/methods'
import { getTypesThunkActions } from '@pokemon-portal/src/utils/redux'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const prefix = 'useCases/pokemon'

export const actions = {
  getMoveById: createAsyncThunk(
    `${prefix}/getMoveById`,
    async (
      input: WithSuccess<api.GetPokemonMove['input'], api.GetPokemonMove['output']>,
      thunkApi
    ) => {
      try {
        const result = await api.getMoveById(input)
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
  getMoveById: createAction<api.GetPokemonMove['output']>(types.getMoveById.fulfilled),
}
