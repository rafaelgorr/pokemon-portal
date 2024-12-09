import { Middleware, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const pendingLogParameters: Record<string, Parameters<typeof console.log>> = {};

export const printMiddleware: Middleware = () => (next: ThunkDispatch<any, any, any>) => (actn) => {
  const action = actn as PayloadAction<any, string, { arg: Record<string, unknown> | string }>;
  if (action.type.includes('/pending')) {
    // remove async action type: "/pending", "/fulfilled", "/rejected"
    const actionType = action.type.split('/').slice(0, -1).join('/');
    pendingLogParameters[actionType] = [
      `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
      `color: white; font-weight: bolder; background: blue`,
      'font-weight: bolder; font-style: italic;',
      action.meta.arg || '',
    ];
  }

  if (action.type.includes('/fulfilled')) {
    // remove async action type: "/pending", "/fulfilled", "/rejected"
    const actionType = action.type.split('/').slice(0, -1).join('/');
    if (pendingLogParameters[actionType]) {
      console.log(...pendingLogParameters[actionType]);
      console.log(
        `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
        `color: white; font-weight: bolder; background: green`,
        'font-weight: bolder; font-style: italic;',
        action.payload && typeof action.payload === 'object' && Object.keys(action.payload).length !== 0
          ? action.payload
          : ''
      );
      delete pendingLogParameters[actionType];
    }
  }
  return next(action);
};

export const errorMiddleware: Middleware = () => (next: ThunkDispatch<any, any, any>) => (actn) => {
  const action = actn as PayloadAction<any, string, { arg: Record<string, unknown> | string }>;

  if (action.type.includes('/rejected')) {
    const error = action.payload as AxiosError;
    toast.error('Error', {
      description: error.message,
    });
    console.log(
      `%c ${action.type.substring(0, action.type.lastIndexOf('/'))} %c`,
      `color: white; font-weight: bolder; background: red`,
      'font-weight: bolder; font-style: italic;',
      action.payload && typeof action.payload === 'object' && Object.keys(action.payload).length !== 0
        ? action.payload
        : ''
    );
  }
  return next(action);
};
