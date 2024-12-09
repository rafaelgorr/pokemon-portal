import { useAppSelector } from '@pokemon-portal/store'
import { selectors as abilitySelectors } from '@pokemon-portal/store/entities/ability'
import {
  actions,
  selectors as ucSelectors,
} from '@pokemon-portal/store/useCases/ability'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useConnect = () => {
  const selectors = {
    fetching: useAppSelector(ucSelectors.isUcFetching('getAbilityById')),
    abilities: useAppSelector(abilitySelectors.getAbilitiesEntities),
    gettedAbilities: useAppSelector(ucSelectors.getGettedIds),
  }
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getAbilityById: actions.getAbilityById,
    },
    dispatch,
  )

  return { actions: dispatchedActions, selectors }
}
