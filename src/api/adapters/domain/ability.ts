import { Ability, AbilityPokemon, PokemonAbility } from 'pokenode-ts'

import { capitalFirstLatter } from '@pokemon-portal/src/utils/methods'

import { DomainAbility, DomainPokemonAbility } from '../../interfaces/Ability'
import { getIdFromUrl, mapNamedAPIResourceToApi } from './shared'

export const mapPokemonAbilityToDomain = (ability: PokemonAbility): DomainPokemonAbility => ({
  id: getIdFromUrl(ability.ability.url),
  name: capitalFirstLatter(ability.ability.name),
  isHidden: ability.is_hidden,
})

export const mapAbilityPokemonToDomain = (ability: AbilityPokemon): DomainPokemonAbility => ({
  id: getIdFromUrl(ability.pokemon.url),
  name: capitalFirstLatter(ability.pokemon.name),
  isHidden: ability.is_hidden,
})

export const mapAbilityToDomain = (ability: Ability): DomainAbility => ({
  id: ability.id.toString(),
  name: capitalFirstLatter(ability.name),
  effect: ability.effect_entries.find((eE) => eE.language.name === 'en')?.effect || '',
  isMainSeries: ability.is_main_series ? 'Yes' : 'No',
  generation: mapNamedAPIResourceToApi(ability.generation),
  pokemons: ability.pokemon.map(mapAbilityPokemonToDomain),
})
