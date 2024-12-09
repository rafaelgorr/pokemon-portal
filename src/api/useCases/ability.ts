import { pokemonClient } from './'
import { mapAbilityToDomain } from '../adapters/domain/ability'
import { mapNamedAPIResourceToApi } from '../adapters/domain/shared'
import { DomainAbility, DomainListAbility } from '../interfaces/domain/Ability'

type GetAbilitiesInput = {
  offset?: Parameters<typeof pokemonClient.listAbilities>[0]
  limit?: Parameters<typeof pokemonClient.listAbilities>[1]
}

export type GetAbilities = {
  input?: GetAbilitiesInput
  output: DomainListAbility[]
}

export const getAbilities = async (input: GetAbilities['input']): Promise<GetAbilities['output']> => {
  const abilities = await pokemonClient.listAbilities(input?.offset, input?.limit ?? -1)

  return abilities.results.map(mapNamedAPIResourceToApi)
}

type GetAbilityByIdInput = {
  id: string
}

export type GetAbilityById = {
  input: GetAbilityByIdInput
  output: DomainAbility
}

export const getAbilityById = async (input: GetAbilityById['input']): Promise<GetAbilityById['output']> => {
  const ability = await pokemonClient.getAbilityById(Number(input.id))

  return mapAbilityToDomain(ability)
}
