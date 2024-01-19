import { useAppSelector } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/move'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/move'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useConnect = () => {
  const selectors = {
    fetching: useAppSelector(ucSelectors.isUcFetching('getMoveById')),
    moves: useAppSelector(pokemonSelectors.getMoveEntities),
    gettedMoves: useAppSelector(ucSelectors.getGettedIds),
  }
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getMoveById: actions.getMoveById,
    },
    dispatch,
  )

  return { actions: dispatchedActions, selectors }
}
