import { combineReducers } from 'redux'

import { initialState as drawerInitialState, reducer as drawer } from './drawer'
import { initialState as errorInitialState, reducer as error } from './error'
import { initialState as pokemonInitialState, reducer as pokemon } from './pokemon'
import { initialState as themeInitialState, reducer as theme } from './theme'

export const initialState = {
  theme: themeInitialState,
  drawer: drawerInitialState,
  error: errorInitialState,
  pokemon: pokemonInitialState,
}

export type UIState = typeof initialState

export default combineReducers<UIState>({ theme, drawer, error, pokemon })
