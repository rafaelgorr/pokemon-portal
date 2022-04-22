import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/ability'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/ability'

// const isFetching = createSelector(
//   (state: StoreState) => ucSelectors.isFetching(state.useCases.pokemon),
//   (...conditions) => conditions.some((c) => c)
// )

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  const selectors = useAppSelector((state) => ({
    fetching: ucSelectors.isUcFetching('getAbilities')(state.useCases.ability),
    gettingAbility: ucSelectors.isUcFetching('getAbilityById')(state.useCases.ability),
    abilities: pokemonSelectors.getAbilities(state.entities.ability),
    gettedAbilities: ucSelectors.getGettedIds(state.useCases.ability),
    fetched: ucSelectors.getFetched(state.useCases.ability),
  }))
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getAbilities: actions.getAbilities,
      getAbilityById: actions.getAbilityById,
    },
    dispatch
  )

  return { actions: dispatchedActions, selectors }
}
