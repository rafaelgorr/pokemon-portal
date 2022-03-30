import { NamedAPIResource } from 'pokenode-ts'

import { mapListPokemonToDomain, mapPokemonToDomain } from '../adapters'
import { DomainListPokemon, DomainPokemon } from '../interfaces/Pokemon'
import { pokemonClient } from './'

type GetPokemonsInput = {
  offset?: Parameters<typeof pokemonClient.listPokemons>[0]
  limit?: Parameters<typeof pokemonClient.listPokemons>[1]
}

type GetPokemonsByIdInput = {
  id: string
}

type GetPokemonsOutput = DomainListPokemon[]

export type GetPokemons = {
  input?: GetPokemonsInput
  output: GetPokemonsOutput
}

export type GetPokemonById = {
  input: GetPokemonsByIdInput
  output: DomainPokemon
}

export const getPokemons = async (input?: GetPokemons['input']): Promise<GetPokemons['output']> => {
  const pokemons = await pokemonClient.listPokemons(input?.offset, input?.limit || 251)

  return (pokemons.results as NamedAPIResource[]).map(mapListPokemonToDomain)
}

export const getPokemonById = async (
  input: GetPokemonById['input']
): Promise<GetPokemonById['output']> => {
  const pokemon = await pokemonClient.getPokemonById(Number(input.id))

  return mapPokemonToDomain(pokemon)
}
