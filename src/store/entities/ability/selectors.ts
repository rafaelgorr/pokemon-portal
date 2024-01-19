import { StoreState } from '@pokemon-portal/src/store'

import { adapter } from './slice'

export const getAbilities = adapter.getSelectors<StoreState>(
  (state) => state.entities.ability.abilities,
).selectAll

export const getAbilitiesEntities = adapter.getSelectors<StoreState>(
  (state) => state.entities.ability.abilities,
).selectEntities
