import { EntityAdapter, EntityState } from '@reduxjs/toolkit'

export const values: typeof Object.values = <T>(obj: T | undefined) => {
  return Object.values(obj || {})
}

export const entries: typeof Object.entries = <T>(obj?: T) => {
  return Object.entries(obj || {})
}

export const keys: typeof Object.keys = <T>(obj?: T): string[] => {
  return Object.keys(obj || {})
}

export const extractNumbers = (str?: string): string => (str ? str.replace(/\D/g, '') : '')
export const extractLetters = (str?: string): string =>
  str
    ? str
        .replace(/[^A-Za-z ]/g, '')
        .toUpperCase()
        .trim()
    : ''

export type ValueOf<T> = T[keyof T]

export type RequiredBy<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// maps 0 -> -90 and 100 -> 90
export const mapToAngle = (value: number | string): number => {
  const val = Number(value)
  return (val - 50) * 1.75
}

export const map =
  <I, O>(fn: (i: I) => O) =>
  (arr: I[]): O[] =>
    arr.map(fn)

export const replace =
  (
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string
    },
    replaceValue: string
  ) =>
  (string: string): string =>
    string.replace(searchValue, replaceValue)

export const inRange =
  (min: number | string, max: number | string) =>
  (value: number | string): boolean =>
    Number(value) >= Number(min) && Number(value) <= Number(max)

export const filterLetters = (str?: string): string => (str ? str.replace(/[A-Za-z]/g, '') : '')

export const trace =
  (...messages: string[]) =>
  <T>(thing: T): T => {
    console.log(...messages, thing)

    return thing
  }

export const sortTuple = (tuple: [string | number, string | number]) => {
  const [a, b] = tuple
  return a < b ? [a, b] : [b, a]
}

export const find =
  <T>(fn: (item: T) => boolean) =>
  (arr: T[]): T | undefined =>
    arr.find(fn)

export const removeItem = <T>(indexToRemove: number, arr: T[]) => [
  ...arr.slice(0, indexToRemove),
  ...arr.slice(indexToRemove + 1),
]

export const removeOldCopies =
  <K extends string>(identifierKey: K) =>
  <T extends { lastUpdate: number } & Record<K, any>>(array: T[]) =>
    Object.values(
      array.reduce((accumulator, current) => {
        if (accumulator[current[identifierKey]]) {
          if (accumulator[current[identifierKey]].lastUpdate < current.lastUpdate) {
            return { ...accumulator, [current[identifierKey]]: current }
          }
        } else {
          return { ...accumulator, [current[identifierKey]]: current }
        }
        return accumulator
      }, {} as Record<string, T>)
    )
export type WithEntityState<T> = { [k in keyof T]: EntityState<T[k]> }
export type WithEntityAdapter<T> = { [k in keyof T]: EntityAdapter<T[k]> }
export type WithSuccess<T, A = void> = T & { onSuccess?: (args: A) => void }

export interface NormalizedEntity<T> {
  [id: string]: T
}

export interface EntityStore<T> {
  entities: NormalizedEntity<T>
  ids: string[]
}

export type WithEntityStore<T> = {
  [K in keyof T]: T[K] extends Array<any> ? EntityStore<T[K][0]> : unknown
}

export type NestedKeyOf<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<string, any>
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

export const capitalFirstLatter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
