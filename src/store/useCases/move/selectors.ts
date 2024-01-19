import { StoreState } from '@pokemon-portal/src/store'
import { values } from '@pokemon-portal/src/utils/methods'
import { createSelector } from '@reduxjs/toolkit'

import { State } from './slice'

export const isFetching = createSelector(
  (state: StoreState) => state.useCases.move.fetching,
  (fetching) => values(fetching).some((ft) => ft),
)

export const isUcFetching = (ucName: keyof State['fetching']) =>
  createSelector(
    (state: StoreState) => state.useCases.move.fetching,
    (fetching) => fetching[ucName],
  )

export const getGettedIds = (state: StoreState) => state.useCases.move.gettedIds

export const getFetched = (state: StoreState) => state.useCases.move.fetched
