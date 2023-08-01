import { NamedAPIResource } from 'pokenode-ts'

import { capitalFirstLatter } from '@pokemon-portal/src/utils/methods'

import { DomainPokemonResource } from '../../interfaces/domain/Pokemon'

export const getIdFromUrl = (url: string) => url.replace(/.*\/(\d*)\/$/g, '$1')

export const mapNamedAPIResourceToApi = <T extends NamedAPIResource>(
  input: T
): DomainPokemonResource => ({
  id: getIdFromUrl(input.url),
  name: capitalFirstLatter(input.name).replace(/(-)/g, ' '),
})
