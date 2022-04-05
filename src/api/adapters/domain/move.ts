import { Move } from 'pokenode-ts'

import { capitalFirstLatter } from '@pokemon-portal/src/utils/methods'

import { DomainMove } from '../../interfaces/Move'
import { mapNamedAPIResourceToApi } from './shared'

const mapMoveTargetToDomain = (tgt: Move['target']): DomainMove['target'] =>
  capitalFirstLatter(tgt.name.replace(/(-)/g, ' '))

export const mapMoveToDomain = (move: Move): DomainMove => ({
  id: move.id.toString(),
  name: capitalFirstLatter(move.name).replace(/(-)/g, ' '),
  type: mapNamedAPIResourceToApi(move.type),
  accuracy: move.accuracy || 0,
  effect: move.effect_entries[0].effect,
  power: move.power || 0,
  pp: move.pp || 0,
  priority: move.priority,
  damageClass: move.damage_class ? capitalFirstLatter(move.damage_class?.name) : '',
  target: mapMoveTargetToDomain(move.target),
  learnedByPokemon: move.learned_by_pokemon.map(mapNamedAPIResourceToApi),
})
