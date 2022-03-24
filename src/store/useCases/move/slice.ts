import { entries, keys } from '@pokemon-portal/utils/methods'
import { createSlice } from '@reduxjs/toolkit'

import { addTypeMatcher } from '../../shared'
import { types } from './'
import { prefix } from './actions'

export interface State {
  fetching: Partial<Record<keyof typeof types, boolean>>
}

export const initialState: State = {
  fetching: {},
}

export default createSlice({
  name: prefix,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    entries(types).forEach(([ucType, actionType]) =>
      addTypeMatcher({ [ucType]: actionType }, builder)
    )
    builder.addDefaultCase((state) => {
      state.fetching = keys(types).reduce(
        (ftch, type) => ({ ...ftch, [type]: false }),
        {} as Record<keyof typeof types, boolean>
      )
    })
  },
})
