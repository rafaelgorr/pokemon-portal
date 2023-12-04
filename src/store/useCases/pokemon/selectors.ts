import { values } from '@pokemon-portal/src/utils/methods'
import { createSelector } from '@reduxjs/toolkit'
import { StoreState } from '../..'
import { State } from './slice'

export const isFetching = createSelector(
  (state: StoreState) => state.useCases.pokemon.fetching,
  (fetching) => values(fetching).some((ft) => ft),
)

export const isUcFetching = (ucName: keyof State['fetching']) =>
  createSelector(
    (state: StoreState) => state.useCases.pokemon.fetching,
    (fetching) => fetching[ucName],
  )
export const getGettedIds = (state: StoreState) => state.useCases.pokemon.gettedIds
