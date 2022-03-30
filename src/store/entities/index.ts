import { combineReducers } from 'redux'

import { initialState as abilityInitialState, reducer as ability } from './ability'
import { initialState as moveInitialState, reducer as move } from './move'
import { initialState as pokemonInitialState, reducer as pokemon } from './pokemon'

export const initialState = {
  pokemon: pokemonInitialState,
  move: moveInitialState,
  ability: abilityInitialState,
}

export type EntitiesState = typeof initialState

export default combineReducers<EntitiesState>({ pokemon, move, ability })
