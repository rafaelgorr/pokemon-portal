import { DomainListAbility } from '@pokemon-portal/src/api/interfaces/domain/Ability'
import { fulfilledActions as moveFulfilledActions } from '@pokemon-portal/src/store/useCases/ability'
import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const adapter = createEntityAdapter<DomainListAbility>({
  sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
})

export type State = {
  abilities: EntityState<DomainListAbility, string>
}

export const initialState: State = {
  abilities: adapter.getInitialState(),
}

const session = createSlice({
  name: 'entities/move',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveFulfilledActions.getAbilities, (state, action) => {
      adapter.addMany(state.abilities, action.payload)
    })
    builder.addCase(moveFulfilledActions.getAbilityById, (state, action) => {
      adapter.setOne(state.abilities, action.payload)
    })
  },
})

export default session
