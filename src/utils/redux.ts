import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { Reducer } from 'redux'

type ActionType<Type, Payload> = {
  type: Type
  payload: Payload
}
export const getTypesActions = <Actions extends Record<string, unknown>>(actions: Actions) => {
  type Types = {
    [key in keyof Actions]: string
  }
  return Object.keys(actions).reduce((acc, curr) => {
    return { ...acc, [curr]: `${actions[curr as keyof Actions]}` }
  }, {} as Types)
}

export type { ActionType }
export type ThunkActionsTypes = Record<keyof Omit<AsyncThunk<unknown, unknown, any>, 'typePrefix'>, string>

export const getTypesThunkActions = <Actions extends Record<string, unknown>>(actions: Actions) => {
  return Object.keys(actions).reduce(
    (acc, curr) => {
      const thunkAction = actions[curr as keyof Actions] as unknown as ReturnType<typeof createAsyncThunk>

      const types: ThunkActionsTypes = {
        pending: thunkAction.pending.type,
        fulfilled: thunkAction.fulfilled.type,
        rejected: thunkAction.rejected.type,
        settled: thunkAction.settled.name,
      }

      return {
        ...acc,
        [curr]: types,
      }
    },
    {} as Record<keyof Actions, ThunkActionsTypes>,
  )
}

export const getActionTypes = <Actions extends Record<string, unknown>>(actions: Actions) => {
  type Types = {
    [key in keyof Actions]: string
  }
  return Object.keys(actions).reduce((acc, curr) => {
    return { ...acc, [curr]: `${actions[curr as keyof Actions]}` }
  }, {} as Types)
}

export const createAsyncReducers = <State extends { [k: string]: any }>(
  types: ThunkActionsTypes,
  property: keyof State = 'fetching',
) => {
  return {
    [types.pending]: (state: State) => {
      state[property] = true as any
    },
    [types.fulfilled]: (state: State) => {
      state[property] = false as any
    },
    [types.rejected]: (state: State) => {
      state[property] = false as any
    },
  }
}

export type ThunkApi = Parameters<Parameters<typeof createAsyncThunk>[1]>[1]

export type WithReducer<T extends Record<string, unknown>> = {
  [k in keyof T]: Reducer<T[k]>
}
