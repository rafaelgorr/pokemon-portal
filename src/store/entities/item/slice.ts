import { DomainItem } from '@pokemon-portal/src/api/interfaces'
import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const adapter = createEntityAdapter<DomainItem>({
  sortComparer: (a, b) => (Number(a.id) < Number(b.id) ? -1 : 1),
})

export type State = {
  items: EntityState<DomainItem, string>
}

export const initialState: State = {
  items: adapter.getInitialState(),
}

const session = createSlice({
  name: 'entities/item',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default session
