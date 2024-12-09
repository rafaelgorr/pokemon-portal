import { StoreState } from '../..'

export const getSelectedPokemonId = (state: StoreState) =>
  state.ui.pokemon.selectedPokemonId
