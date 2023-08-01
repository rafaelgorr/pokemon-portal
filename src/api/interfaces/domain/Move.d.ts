import { RequiredBy } from '@pokemon-portal/src/utils/methods'

import { DomainListPokemon, DomainPokemonMove } from './Pokemon'

export interface DomainMove extends DomainPokemonMove {
  type: DomainPokemonMoveType
  accuracy: number
  power: number
  pp: number
  priority: number
  effect: string
  damageClass: string
  target: string
  learnedByPokemon: DomainListPokemon[]
}

export type DomainListMove = RequiredBy<DomainMove, 'id' | 'name'>
