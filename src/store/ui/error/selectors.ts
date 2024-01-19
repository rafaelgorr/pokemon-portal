import { StoreState } from '@pokemon-portal/src/store'

export const getError = (state: StoreState) => state.ui.error.error
