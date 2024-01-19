import { StoreState } from '@pokemon-portal/src/store'

export const getMode = (state: StoreState) => state.ui.theme.mode
