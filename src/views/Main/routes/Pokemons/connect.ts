import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/pokemon'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/pokemon'

// const isFetching = createSelector(
//   (state: StoreState) => ucSelectors.isFetching(state.useCases.pokemon),
//   (...conditions) => conditions.some((c) => c)
// )

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  const selectors = useAppSelector((state) => ({
    fetching: ucSelectors.isUcFetching('getPokemons')(state.useCases.pokemon),
    isGettingPokemon: ucSelectors.isUcFetching('getPokemonById')(state.useCases.pokemon),
    pokemons: pokemonSelectors.getPokemons(state.entities.pokemon),
    gettedPokemons: ucSelectors.getGettedIds(state.useCases.pokemon),
  }))
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getPokemons: actions.getPokemons,
      getPokemonById: actions.getPokemonById,
    },
    dispatch
  )

  return { actions: dispatchedActions, selectors }
}
