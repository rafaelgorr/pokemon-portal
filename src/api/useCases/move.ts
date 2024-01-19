import { moveClient } from './'
import { mapMoveToDomain } from '../adapters'
import { mapNamedAPIResourceToApi } from '../adapters/domain/shared'
import { DomainListMove, DomainMove } from '../interfaces/domain/Move'

type GetPokemonMovesInput = {
  offset?: Parameters<typeof moveClient.listMoves>[0]
  limit?: Parameters<typeof moveClient.listMoves>[1]
}

export type GetPokemonMoves = {
  input?: GetPokemonMovesInput
  output: DomainListMove[]
}

export const getMoves = async (input: GetPokemonMoves['input']) => {
  const moves = await moveClient.listMoves(input?.offset, input?.offset || -1)

  return moves.results.map(mapNamedAPIResourceToApi)
}

type GetPokemonMoveInput = {
  id: string
}

export type GetPokemonMove = {
  input: GetPokemonMoveInput
  output: DomainMove
}

export const getMoveById = async (
  input: GetPokemonMove['input'],
): Promise<GetPokemonMove['output']> => {
  const move = await moveClient.getMoveById(Number(input.id))

  return mapMoveToDomain(move)
}
