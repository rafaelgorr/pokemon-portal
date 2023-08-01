import _ from 'lodash'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/pokemon'
import { actions as uiActions, selectors as uiSelectors } from '@pokemon-portal/store/ui/pokemon'
import {
  pokemonAsyncActions,
  selectors as ucSelectors,
} from '@pokemon-portal/store/useCases/pokemon'

// const isFetching = createSelector(
//   (state: StoreState) => ucSelectors.isFetching(state.useCases.pokemon),
//   (...conditions) => conditions.some((c) => c)
// )

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  // const selectors = {
  //   pokemons: useAppSelector(
  //     (state) => pokemonSelectors.getPokemons(state.entities.pokemon),
  //     shallowEqual
  //   ),
  //   pokemonsEntities: useAppSelector(
  //     (state) => pokemonSelectors.getPokemonsEntities(state.entities.pokemon),
  //     shallowEqual
  //   ),
  //   gettedPokemons: useAppSelector(
  //     (state) => ucSelectors.getGettedIds(state.useCases.pokemon),
  //     shallowEqual
  //   ),

  //   fetching: useAppSelector((state) =>
  //     ucSelectors.isUcFetching(state.useCases.pokemon, 'getPokemons')
  //   ),
  //   isGettingPokemon: useAppSelector((state) =>
  //     ucSelectors.isUcFetching(state.useCases.pokemon, 'getPokemonById')
  //   ),
  //   selectedPokemonId: useAppSelector((state) =>
  //     uiSelectors.getSelectedPokemonId(state.ui.pokemon)
  //   ),
  // }

  const selectors = useAppSelector(
    (state) => ({
      fetching: ucSelectors.isUcFetching(state.useCases.pokemon, 'getPokemons'),
      isGettingPokemon: ucSelectors.isUcFetching(state.useCases.pokemon, 'getPokemonById'),
      pokemons: pokemonSelectors.getPokemons(state.entities.pokemon),
      pokemonsEntities: pokemonSelectors.getPokemonsEntities(state.entities.pokemon),
      gettedPokemons: ucSelectors.getGettedIds(state.useCases.pokemon),
      selectedPokemonId: uiSelectors.getSelectedPokemonId(state.ui.pokemon),
    }),
    { equalityFn: _.isEqual }
  )

  const actions = {
    getPokemons: pokemonAsyncActions.getPokemons,
    getPokemonById: pokemonAsyncActions.getPokemonById,
    setSelectedPokemon: uiActions.setSelectedPokemon,
  }

  return {
    actions,
    selectors,
  }
}
