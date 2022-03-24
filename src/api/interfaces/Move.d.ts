import { DomainPokemonMove } from './Pokemon'

export interface DomainMove extends DomainPokemonMove {
  type: DomainPokemonMoveType
  accuracy: number
  power: number
  pp: number
  priority: number
  effect: string
  damageClass: string
  target: string
}
