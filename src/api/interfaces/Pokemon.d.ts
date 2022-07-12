import { RequiredBy } from '@pokemon-portal/src/utils/methods'

import { DomainPokemonAbility } from './Ability'

export type DomainPokemonResource = {
  id: string
  name: string
}

export type DomainPokemonType = DomainPokemonResource

export type DomainPokemonMoveType = DomainPokemonResource

export type DomainPokemonMove = {
  id: string
  name: string
}

export type DomainPokemon = {
  id: string
  name: string
  height: number
  weight: number
  abilities: DomainPokemonAbility[]
  types: DomainPokemonType[]
  moves: DomainPokemonMove[]
}

export interface DomainListPokemon extends RequiredBy<DomainPokemon, 'id' | 'name'> {}
