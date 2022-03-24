import { NamedAPIResource, Pokemon, PokemonAbility, PokemonMove, PokemonType } from 'pokenode-ts'

import { capitalFirstLatter } from '@pokemon-portal/src/utils/methods'

import {
  DomainPokemon,
  DomainPokemonAbility,
  DomainPokemonMove,
  DomainPokemonType
} from '../../interfaces/Pokemon'
import { getIdFromUrl } from './shared'

export const mapListPokemonToDomain = (input: NamedAPIResource): DomainPokemon => ({
  id: getIdFromUrl(input.url),
  name: capitalFirstLatter(input.name),
})

const mapPokemonTypeToDomain = (type: PokemonType): DomainPokemonType => ({
  id: getIdFromUrl(type.type.url),
  name: capitalFirstLatter(type.type.name),
})

const mapPokemonPokemonAbilityToDomain = (ability: PokemonAbility): DomainPokemonAbility => ({
  id: getIdFromUrl(ability.ability.url),
  name: capitalFirstLatter(ability.ability.name),
  isHidden: ability.is_hidden,
})

const mapListPokemonMoveToDomain = (move: PokemonMove): DomainPokemonMove => ({
  id: getIdFromUrl(move.move.url),
  name: capitalFirstLatter(move.move.name),
})

export const mapPokemonToDomain = (pkm: Pokemon): Required<DomainPokemon> => ({
  id: pkm.id.toString(),
  name: capitalFirstLatter(pkm.name),
  types: pkm.types.map(mapPokemonTypeToDomain),
  abilities: pkm.abilities.map(mapPokemonPokemonAbilityToDomain),
  height: pkm.height / 10,
  weight: pkm.weight / 10,
  moves: pkm.moves.map(mapListPokemonMoveToDomain),
})
