import { useAppSelector } from '@pokemon-portal/src/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/ability'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/ability'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useConnect = () => {
  const selectors = {
    fetching: useAppSelector(ucSelectors.isUcFetching('getAbilities')),
    gettingAbility: useAppSelector(ucSelectors.isUcFetching('getAbilityById')),
    abilities: useAppSelector(pokemonSelectors.getAbilities),
    gettedAbilities: useAppSelector(ucSelectors.getGettedIds),
    fetched: useAppSelector(ucSelectors.getFetched),
  }
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getAbilities: actions.getAbilities,
      getAbilityById: actions.getAbilityById,
    },
    dispatch,
  )

  return { actions: dispatchedActions, selectors }
}
