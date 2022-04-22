import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as moveSelectors } from '@pokemon-portal/store/entities/move'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/move'

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  const selectors = useAppSelector((state) => ({
    fetching: ucSelectors.isUcFetching('getMoves')(state.useCases.move),
    gettingMove: ucSelectors.isUcFetching('getMoveById')(state.useCases.move),
    moves: moveSelectors.getMoves(state.entities.move),
    gettedMoves: ucSelectors.getGettedIds(state.useCases.move),
    fetched: ucSelectors.getFetched(state.useCases.move),
  }))
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getMoves: actions.getMoves,
      getMoveById: actions.getMoveById,
    },
    dispatch
  )

  return { actions: dispatchedActions, selectors }
}
