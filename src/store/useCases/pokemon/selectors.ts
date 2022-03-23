import { values } from '@pokemon-portal/src/utils/methods'
import { createSelector } from '@reduxjs/toolkit'

import { State } from './slice'

export const isFetching = createSelector(
  (state: State) => state.fetching,
  (fetching) => values(fetching).some((ft) => ft)
)

export const isUcFetching = (ucName: keyof State['fetching']) =>
  createSelector(
    (state: State) => state.fetching,
    (fetching) => fetching[ucName]
  )
export const getGettedIds = (state: State) => state.gettedIds
