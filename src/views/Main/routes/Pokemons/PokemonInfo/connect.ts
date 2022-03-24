import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StoreState } from '@pokemon-portal/store'
import { selectors as moveSelectors } from '@pokemon-portal/store/entities/move'
import { actions, selectors as ucSelectors } from '@pokemon-portal/store/useCases/move'

const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
export const useConnect = () => {
  const selectors = useAppSelector((state) => ({
    fetching: ucSelectors.isFetching(state.useCases.move),
    moves: moveSelectors.getMoveEntities(state.entities.move),
  }))
  const dispatch = useDispatch()

  const dispatchedActions = bindActionCreators(
    {
      getMoveById: actions.getMoveById,
    },
    dispatch
  )

  return { actions: dispatchedActions, selectors }
}
