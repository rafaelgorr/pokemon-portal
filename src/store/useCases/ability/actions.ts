import * as api from '@pokemon-portal/api/useCases/ability'
import { WithSuccess } from '@pokemon-portal/src/utils/methods'
import { getTypesThunkActions } from '@pokemon-portal/src/utils/redux'
import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const prefix = 'useCases/pokemon'

export const actions = {
  getAbilities: createAsyncThunk(`${prefix}/getAbilities`, async (input: api.GetAbilities['input'], thunkApi) => {
    try {
      const result = await api.getAbilities(input)
      return result
    } catch (e) {
      return thunkApi.rejectWithValue(e)
    }
  }),
  getAbilityById: createAsyncThunk(
    `${prefix}/getAbilityById`,
    async (input: WithSuccess<api.GetAbilityById['input'], api.GetAbilityById['output']>, thunkApi) => {
      try {
        const result = await api.getAbilityById(input)
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
  getAbilities: createAction<api.GetAbilities['output']>(types.getAbilities.fulfilled),
  getAbilityById: createAction<api.GetAbilityById['output']>(types.getAbilityById.fulfilled),
}
