import { entries, keys } from '@pokemon-portal/utils/methods'
import { createSlice } from '@reduxjs/toolkit'

import { types } from './'
import { fulfilledActions, prefix } from './actions'
import { addTypeMatcher } from '../../shared'

export interface State {
  fetching: Partial<Record<keyof typeof types, boolean>>
  gettedIds: Record<string, string>
}

export const initialState: State = {
  fetching: {},
  gettedIds: {},
}

export default createSlice({
  name: prefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fulfilledActions.getPokemonById, (state, action) => {
      state.gettedIds[action.payload.id] = action.payload.name
    })

    entries(types).forEach(([ucType, actionType]) =>
      addTypeMatcher({ [ucType]: actionType }, builder),
    )

    builder.addDefaultCase((state) => {
      state.fetching = keys(types).reduce(
        (ftch, type) => ({ ...ftch, [type]: false }),
        {} as Record<keyof typeof types, boolean>,
      )
    })
  },
})
