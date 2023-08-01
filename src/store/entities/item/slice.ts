import { DomainAbility } from '@pokemon-portal/src/api/interfaces/domain/Ability'
import { fulfilledActions as moveFulfilledActions } from '@pokemon-portal/src/store/useCases/ability'
import { RequiredBy, WithEntityAdapter, WithEntityState } from '@pokemon-portal/utils/methods'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

type Adapters = {
  abilities: RequiredBy<DomainAbility, 'id' | 'name'>
}

export const adapters: WithEntityAdapter<Adapters> = {
  abilities: createEntityAdapter<Adapters['abilities']>({
    selectId: (pokemon) => pokemon.id,
    sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
  }),
} as const

export type State = WithEntityState<Adapters>

export const initialState: State = {
  abilities: adapters.abilities.getInitialState(),
}

const session = createSlice({
  name: 'entities/move',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveFulfilledActions.getAbilities, (state, action) => {
      adapters.abilities.addMany(state.abilities, action.payload)
    })
    builder.addCase(moveFulfilledActions.getAbilityById, (state, action) => {
      adapters.abilities.setOne(state.abilities, action.payload)
    })
  },
})

export default session
