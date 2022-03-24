import { mapMoveToDomain } from '../adapters'
import { DomainMove } from '../interfaces/Move'
import { moveClient } from './'

type GetPokemonMoveInput = {
  id: string
}

export type GetPokemonMove = {
  input: GetPokemonMoveInput
  output: DomainMove
}

export const getMoveById = async (
  input: GetPokemonMove['input']
): Promise<GetPokemonMove['output']> => {
  const move = await moveClient.getMoveById(Number(input.id))

  return mapMoveToDomain(move)
}
