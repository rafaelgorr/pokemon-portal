import { Box, CircularProgress, Grid, useTheme } from '@mui/material'
import config from '@pokemon-portal/config'
import {
  DomainListPokemon,
  DomainPokemon,
} from '@pokemon-portal/src/api/interfaces/domain/Pokemon'
import {
  ListWithSearch,
  ListWithSearchProps,
  PageTitle,
} from '@pokemon-portal/src/components'
import { IntersectionObserverParams } from '@pokemon-portal/src/components/organisms/ListWithSearch/useIntersectionObserver'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import PokemonInfo from './PokemonInfo'
import { useConnect } from './connect'
import { useStyles } from './styles'
import { useAppDispatch } from '../../../../store'

type PokemonLocationState = {
  id: string
}

const pokemonsLimit = 50

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {}

const Pokemons = (props: Props) => {
  const styles = useStyles(useTheme())

  const location = useLocation()
  const locationState = location?.state as PokemonLocationState | undefined

  const [offset, setOffset] = useState(0)

  const [pokemonLocationId, setPokemonLocationId] = useState('')

  useEffect(() => {
    if (locationState?.id) setPokemonLocationId(locationState?.id)
  }, [locationState])

  const { actions, selectors } = useConnect()

  const { fetching, pokemons, pokemonsEntities, selectedPokemonId } = selectors

  const [selectedPokemon, setSelectedPokemon] = useState<
    DomainPokemon | undefined
  >(() => {
    const pokemon = pokemonsEntities?.[selectedPokemonId] as DomainPokemon
    return pokemon
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.getPokemons())

    // actions.getPokemons({
    //   limit: pokemonsLimit,
    //   offset,
    //   onSuccess: (done) => {
    //     // console.log(done)
    //   },
    // })
  }, [offset])

  const handleInfiniteScroll: IntersectionObserverParams['interObserverCallback'] =
    (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        setOffset((oldOffset) => oldOffset + pokemonsLimit)
      }
    }

  useEffect(() => {
    return () => {
      actions.setSelectedPokemon(selectedPokemon?.id ?? '')
    }
  }, [selectedPokemon])

  useEffect(() => {
    if (pokemonLocationId && pokemonLocationId !== selectedPokemon?.id) {
      const pokemon = pokemonsEntities[pokemonLocationId]
      if (pokemon) {
        if (!selectors.gettedPokemons[pokemon.id])
          dispatch(
            actions.getPokemonById({
              id: pokemon.id,
            }),
          )
            .unwrap()
            .then((pkm) => {
              setSelectedPokemon(pkm)
              setPokemonLocationId('')
            })
            .catch(console.error)
        else {
          setSelectedPokemon(pokemon as DomainPokemon)
          setPokemonLocationId('')
        }
      }
    }
  }, [pokemonLocationId, pokemonsEntities])

  const handleSelectPokemon = (pkm: DomainPokemon) => () => {
    if (!selectors.gettedPokemons[pkm.id])
      dispatch(actions.getPokemonById({ id: pkm.id }))
        .unwrap()
        .then((pokemon) => setSelectedPokemon(pokemon))
        .catch(console.error)
    else setSelectedPokemon(pkm)
  }

  const infiniteScrollProps: ListWithSearchProps<DomainListPokemon>['infiniteScrollProps'] =
    {
      interObserverCallback: handleInfiniteScroll,
      loaderCount: pokemonsLimit,
    }

  return (
    <Box sx={styles.container}>
      <PageTitle label="Pokemons" />

      <Grid container spacing={2} flex={1} height="90%">
        <Grid
          container
          item
          xs={2.5}
          flexDirection="column"
          textAlign="center"
          height="100%"
        >
          <ListWithSearch<DomainListPokemon>
            listItems={pokemons}
            listItemProps={{
              getPrimary: (pkm) => pkm.name,
              getAvatarSrc: (pkm) => config.getOtherSprite(pkm.id),
              // config.getGenerationSprite({
              //   number: 'three',
              //   game: 'fireredLeafgreen',
              //   pokemonId: pkm.id,
              // }),
            }}
            handleItemClick={handleSelectPokemon}
            selectedItem={selectedPokemon}
            fuseKeys={['name', 'id']}
            fetching={fetching}
            sx={styles.pokemonList}
            infiniteScrollProps={infiniteScrollProps}
          />
        </Grid>
        <Grid container item xs={9.5} flex={1} height="100%">
          {selectors.isGettingPokemon ? (
            <Box sx={styles.circularProgressContainer}>
              <CircularProgress />
            </Box>
          ) : (
            selectedPokemon && <PokemonInfo pokemon={selectedPokemon} />
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Pokemons
