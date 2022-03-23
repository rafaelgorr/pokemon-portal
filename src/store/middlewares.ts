import { actions } from '@pokemon-portal/store/ui/error'
import { Middleware, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit'

export const printMiddleware: Middleware =
  (api) =>
  (next: ThunkDispatch<any, any, any>) =>
  (action: PayloadAction<any, string, { arg: Record<string, unknown> | string }>) => {
    if (action.type.includes('/pending')) {
      console.log(
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: blue`,
        'font-weight: bolder; font-style: italic;',
        action.meta.arg || ''
      )
    }
    if (action.type.includes('/fulfilled')) {
      console.log(
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: green`,
        'font-weight: bolder; font-style: italic;',
        action.payload
          ? typeof action.payload === 'object'
            ? Object.keys(action.payload).length !== 0
              ? action.payload
              : ''
            : action.payload
          : ''
      )
    }
    return next(action)
  }

export const errorMiddleware: Middleware =
  (api) => (next: ThunkDispatch<any, any, any>) => (action) => {
    if (action.type.includes('/rejected')) {
      console.log(
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: red`,
        'font-weight: bolder; font-style: italic;',
        action.payload
          ? typeof action.payload === 'object'
            ? Object.keys(action.payload).length !== 0
              ? action.payload
              : ''
            : action.payload
          : ''
      )
      const error = action.payload
      api.dispatch(actions.setError(error))
    }
    return next(action)
  }
