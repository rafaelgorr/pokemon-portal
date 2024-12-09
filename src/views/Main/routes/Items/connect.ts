import { useAppSelector } from '@pokemon-portal/store'
import { selectors as moveSelectors } from '@pokemon-portal/store/entities/move'
import {
  actions,
  selectors as ucSelectors,
} from '@pokemon-portal/store/useCases/move'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export const useConnect = () => {
  const selectors = {
    fetching: useAppSelector(ucSelectors.isUcFetching('getMoves')),
    gettingMove: useAppSelector(ucSelectors.isUcFetching('getMoveById')),
    moves: useAppSelector(moveSelectors.getMoves),
    gettedMoves: useAppSelector(ucSelectors.getGettedIds),
    fetched: useAppSelector(ucSelectors.getFetched),
  }
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getMoves: actions.getMoves,
      getMoveById: actions.getMoveById,
    },
    dispatch,
  )

  return { actions: dispatchedActions, selectors }
}
