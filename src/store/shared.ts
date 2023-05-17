import { ActionReducerMapBuilder, AnyAction } from '@reduxjs/toolkit'

import { entries, values } from '../utils/methods'
import { ThunkActionsTypes } from '../utils/redux'

export const addTypeMatcher = <State extends { fetching: Record<string, boolean> }>(
  type: Record<string, ThunkActionsTypes>,
  builder: ActionReducerMapBuilder<State>
) => {
  entries(type).forEach(([ucType, actionTypes]) => {
    values(actionTypes).forEach((actionType) => {
      builder.addMatcher(
        (action: AnyAction) => action.type === actionType,
        (state) => {
          state.fetching[ucType] = actionType.endsWith('/pending')
        }
      )
    })
  })
}
