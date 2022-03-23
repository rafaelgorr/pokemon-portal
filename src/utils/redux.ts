import { createAsyncThunk } from '@reduxjs/toolkit'

import { keys } from './methods'

type ActionType<Type, Payload> = {
  type: Type
  payload: Payload
}
export const getTypesActions = <Actions>(actions: Actions) => {
  type Types = {
    [key in keyof Actions]: string
  }
  return Object.keys(actions).reduce((acc, curr) => {
    return { ...acc, [curr]: `${actions[curr as keyof Actions]}` }
  }, {} as Types)
}

export type { ActionType }

export type AsyncReducers = {
  [k in 'pending' | 'fulfilled' | 'rejected']: string
}

export const getTypesThunkActions = <Actions extends Record<string, unknown>>(actions: Actions) => {
  type Types = {
    [key in keyof Actions]: AsyncReducers
  }

  return keys(actions).reduce((acc, curr) => {
    const thunkAction = actions[curr as keyof Actions] as unknown as ReturnType<
      typeof createAsyncThunk
    >
    return {
      ...acc,
      [curr]: {
        pending: thunkAction.pending.type,
        fulfilled: thunkAction.fulfilled.type,
        rejected: thunkAction.rejected.type,
      },
    }
  }, {} as Types)
}

export const getActionTypes = <Actions>(actions: Actions) => {
  type Types = {
    [key in keyof Actions]: string
  }
  return Object.keys(actions).reduce((acc, curr) => {
    return { ...acc, [curr]: `${actions[curr as keyof Actions]}` }
  }, {} as Types)
}

export const createAsyncReducers = <State extends { [k: string]: any }>(
  types: AsyncReducers,
  property: keyof State = 'fetching'
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
