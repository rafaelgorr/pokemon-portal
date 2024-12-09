import { combineReducers } from 'redux'

import { initialState as abilityInitialState, reducer as ability } from './ability'
import { initialState as itemInitialState, reducer as item } from './item'
import { initialState as moveInitialState, reducer as move } from './move'
import { initialState as pokemonInitialState, reducer as pokemon } from './pokemon'

export const initialState = {
  pokemon: pokemonInitialState,
  move: moveInitialState,
  ability: abilityInitialState,
  item: itemInitialState,
}
export type EntitiesState = typeof initialState

export default combineReducers({
  pokemon,
  move,
  ability,
  item,
} satisfies Record<keyof EntitiesState, unknown>)
