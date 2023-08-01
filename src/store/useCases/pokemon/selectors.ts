import { values } from '@pokemon-portal/src/utils/methods'
import { createSelector } from '@reduxjs/toolkit'

import { State } from './slice'

export const isFetching = createSelector(
  (state: State) => state.fetching,
  (fetching) => values(fetching).some((ft) => ft)
)

export const isUcFetching = createSelector(
  [(state: State) => state.fetching, (state: State, ucName: keyof State['fetching']) => ucName],
  (fetching, ucName) => fetching[ucName]
)
export const getGettedIds = (state: State) => state.gettedIds
