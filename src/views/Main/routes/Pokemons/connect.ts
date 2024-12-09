import { useAppSelector } from '@pokemon-portal/store'
import { selectors as pokemonSelectors } from '@pokemon-portal/store/entities/pokemon'
import {
  actions as uiActions,
  selectors as uiSelectors,
} from '@pokemon-portal/store/ui/pokemon'
import {
  pokemonAsyncActions,
  selectors as ucSelectors,
} from '@pokemon-portal/store/useCases/pokemon'

export const useConnect = () => {
  const selectors = {
    fetching: useAppSelector(ucSelectors.isUcFetching('getPokemons')),
    isGettingPokemon: useAppSelector(
      ucSelectors.isUcFetching('getPokemonById'),
    ),
    pokemons: useAppSelector(pokemonSelectors.getPokemons),
    pokemonsEntities: useAppSelector(pokemonSelectors.getPokemonsEntities),
    gettedPokemons: useAppSelector(ucSelectors.getGettedIds),
    selectedPokemonId: useAppSelector(uiSelectors.getSelectedPokemonId),
  }

  const actions = {
    getPokemons: pokemonAsyncActions.getPokemons,
    getPokemonById: pokemonAsyncActions.getPokemonById,
    setSelectedPokemon: uiActions.setSelectedPokemon,
  }

  return {
    actions,
    selectors,
  }
}
