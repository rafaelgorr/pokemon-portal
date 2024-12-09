import { EntityAdapter, EntityState } from '@reduxjs/toolkit'

export const values: typeof Object.values = <T>(obj: T | undefined) => {
  return Object.values(obj ?? {})
}

export const entries: typeof Object.entries = <T>(obj?: T) => {
  return Object.entries(obj ?? {})
}

export const keys: typeof Object.keys = <T>(obj?: T): string[] => {
  return Object.keys(obj ?? {})
}

export const extractNumbers = (str?: string): string =>
  str ? str.replace(/\D/g, '') : ''
export const extractLetters = (str?: string): string =>
  str
    ? str
        .replace(/[^A-Za-z ]/g, '')
        .toUpperCase()
        .trim()
    : ''

export const capitalizeFirstLetter = (string = '') =>
  string.charAt(0).toUpperCase() + string.slice(1)

export type ValueOf<T> = T[keyof T]

export type RequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export const filterLetters = (str?: string): string =>
  str ? str.replace(/[A-Za-z]/g, '') : ''

export type WithEntityState<T> = { [k in keyof T]: EntityState<T[k], string> }
export type WithEntityAdapter<T> = {
  [k in keyof T]: EntityAdapter<T[k], string>
}
export type WithSuccess<T, A = void> = T & { onSuccess?: (args: A) => void }

export interface NormalizedEntity<T> {
  [id: string]: T
}

export interface EntityStore<T> {
  entities: NormalizedEntity<T>
  ids: string[]
}

export type WithEntityStore<T> = {
  [K in keyof T]: T[K] extends any[] ? EntityStore<T[K][0]> : unknown
}

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

export type NestedKeyOf<ObjectType extends Record<string, unknown>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<
    string,
    unknown
  >
    ? `${Key}` | Join<Key, NestedKeyOf<ObjectType[Key]>>
    : `${Key}`
}[keyof ObjectType & (string | number)]

export const capitalFirstLatter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)
