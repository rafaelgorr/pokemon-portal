import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/ability'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/ability'

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  const selectors = useAppSelector((state) => ({
    fetching: ucSelectors.isUcFetching('getAbilityById')(state.useCases.ability),
    abilities: pokemonSelectors.getAbilitiesEntities(state.entities.ability),
  }))
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getAbilityById: actions.getAbilityById,
    },
    dispatch
  )

  return { actions: dispatchedActions, selectors }
}
