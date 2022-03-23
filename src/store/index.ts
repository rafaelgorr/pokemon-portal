import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AnyAction, combineReducers, Reducer } from 'redux'

import { configureStore, Middleware } from '@reduxjs/toolkit'

import entitiesReducers, { EntitiesState, initialState as entitiesInitState } from './entities'
import { errorMiddleware, printMiddleware } from './middlewares'
import uiReducers, { initialState as uiInitState, UIState } from './ui'
import ucReducers, { initialState as ucInitState, UCState } from './useCases'

type ReducerMap<K extends string> = Record<K, Reducer>

export type StoreState = {
  entities: EntitiesState
  ui: UIState
  useCases: UCState
}

const reducers: ReducerMap<keyof StoreState> = {
  ui: uiReducers,
  useCases: ucReducers,
  entities: entitiesReducers,
}

const rootReducer = <S extends StoreState, A extends AnyAction>(
  state: S | undefined,
  action: A
) => {
  if (action.type === 'RESET_STORE') {
    state = undefined
  }

  return combineReducers(reducers)(state, action)
}

const middlewares = !process.env.PRODUCTION ? [printMiddleware] : []

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    [
      ...getDefaultMiddleware({ serializableCheck: false }),
      ...middlewares,
      errorMiddleware,
    ] as Middleware[],
  preloadedState: {
    ui: uiInitState,
    useCases: ucInitState,
    entities: entitiesInitState,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector

export { store }
