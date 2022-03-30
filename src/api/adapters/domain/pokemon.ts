import { NamedAPIResource, Pokemon, PokemonMove, PokemonType } from 'pokenode-ts'

import { capitalFirstLatter } from '@pokemon-portal/src/utils/methods'

import {
  DomainListPokemon,
  DomainPokemon,
  DomainPokemonMove,
  DomainPokemonType
} from '../../interfaces/Pokemon'
import { mapPokemonAbilityToDomain } from './ability'
import { getIdFromUrl } from './shared'

export const mapListPokemonToDomain = (input: NamedAPIResource): DomainListPokemon => ({
  id: getIdFromUrl(input.url),
  name: capitalFirstLatter(input.name),
})

const mapPokemonTypeToDomain = (type: PokemonType): DomainPokemonType => ({
  id: getIdFromUrl(type.type.url),
  name: capitalFirstLatter(type.type.name),
})

const mapListPokemonMoveToDomain = (move: PokemonMove): DomainPokemonMove => ({
  id: getIdFromUrl(move.move.url),
  name: capitalFirstLatter(move.move.name).replace(/(-)/g, ' '),
})

export const mapPokemonToDomain = (pkm: Pokemon): Required<DomainPokemon> => ({
  id: pkm.id.toString(),
  name: capitalFirstLatter(pkm.name),
  types: pkm.types.map(mapPokemonTypeToDomain),
  abilities: pkm.abilities.map(mapPokemonAbilityToDomain),
  height: pkm.height / 10,
  weight: pkm.weight / 10,
  moves: pkm.moves.map(mapListPokemonMoveToDomain),
})
