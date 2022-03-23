import { combineReducers } from 'redux'

import { initialState as patientInitialState, reducer as pokemon } from './pokemon'

export const initialState = {
  pokemon: patientInitialState,
}

export type EntitiesState = typeof initialState

export default combineReducers<EntitiesState>({ pokemon })
