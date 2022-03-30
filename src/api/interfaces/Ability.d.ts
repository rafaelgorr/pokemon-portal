import { DomainGeneration } from './Generation'
import { DomainListPokemon } from './Pokemon'

export type DomainPokemonAbility = {
  id: string
  name: string
  isHidden: boolean
}

export type DomainAbility = {
  id: string
  name: string
  effect: string
  isMainSeries: 'Yes' | 'No'
  pokemons: DomainListPokemon[]
  generation: DomainGeneration
}

export type DomainListAbility = Pick<DomainAbility, 'id' | 'name'>
