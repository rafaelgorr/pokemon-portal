import { StoreState } from '@pokemon-portal/src/store'

import { adapter } from './slice'

export const getMoves = adapter.getSelectors<StoreState>((state) => state.entities.move.moves).selectAll

export const getMoveEntities = adapter.getSelectors<StoreState>((state) => state.entities.move.moves).selectEntities
