import { combineReducers } from 'redux'

import { initialState as patientInitialState, reducer as pokemon } from './pokemon'

export const initialState = {
  pokemon: patientInitialState,
}

export type UCState = typeof initialState

export default combineReducers<UCState>({ pokemon })
