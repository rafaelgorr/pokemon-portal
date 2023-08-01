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

export type DomainPokemonSpeciesFlavorTextEntry = {
  flavorText: string
  version: string
}

export type DomainPokemonSpecies = {
  id: string
  name: string
  flavorTextEntries: DomainPokemonSpeciesFlavorTextEntry[]
}

export type DomainPokemon = {
  id: string
  name: string
  height: number
  weight: number
  abilities: DomainPokemonAbility[]
  types: DomainPokemonType[]
  moves: DomainPokemonMove[]
  species: DomainPokemonSpecies
}

export interface DomainListPokemon extends RequiredBy<DomainPokemon, 'id' | 'name'> {}
