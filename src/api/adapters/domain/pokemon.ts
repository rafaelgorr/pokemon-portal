import { capitalFirstLatter, capitalizeFirstLetter } from '@pokemon-portal/src/utils/methods'
import { FlavorText, NamedAPIResource, Pokemon, PokemonMove, PokemonSpecies, PokemonType } from 'pokenode-ts'

import { mapPokemonAbilityToDomain } from './ability'
import { getIdFromUrl } from './shared'
import { DomainPokemonSpeciesFlavorTextEntry } from '../../interfaces'
import { DomainListPokemon, DomainPokemon, DomainPokemonMove, DomainPokemonType } from '../../interfaces/domain/Pokemon'

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

const mapPokemonSpeciesFlavorTextEntryToDomain = (
  speciesFTE: FlavorText & { version?: NamedAPIResource },
): DomainPokemonSpeciesFlavorTextEntry => ({
  flavorText: speciesFTE.flavor_text,
  version: capitalizeFirstLetter(speciesFTE.version?.name),
})

const mapPokemonSpeciesToDomain = (pkmSpecies: PokemonSpecies): Required<DomainPokemon>['species'] => ({
  id: pkmSpecies.id.toString(),
  name: pkmSpecies.name,
  flavorTextEntries: pkmSpecies.flavor_text_entries
    .filter((fTE) => fTE.language.name === 'en')
    .map(mapPokemonSpeciesFlavorTextEntryToDomain),
})

export const mapPokemonToDomain = (pkm: Pokemon, pkmSpecies: PokemonSpecies): Required<DomainPokemon> => ({
  id: pkm.id.toString(),
  name: capitalFirstLatter(pkm.name),
  types: pkm.types.map(mapPokemonTypeToDomain),
  abilities: pkm.abilities.map(mapPokemonAbilityToDomain),
  height: pkm.height / 10,
  weight: pkm.weight / 10,
  moves: pkm.moves.map(mapListPokemonMoveToDomain),
  species: mapPokemonSpeciesToDomain(pkmSpecies),
})
