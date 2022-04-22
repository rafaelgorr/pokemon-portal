import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

import { Box, CircularProgress, Grid, useTheme } from '@mui/material'
import config from '@pokemon-portal/config'
import { DomainListPokemon, DomainPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { ListWithSearch, PageTitle } from '@pokemon-portal/src/components'

import { useConnect } from './connect'
import PokemonInfo from './PokemonInfo'
import { useStyles } from './styles'

type PokemonLocationState = {
  id: string
}

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {}

const Pokemons = (props: Props) => {
  const styles = useStyles(useTheme())

  const location = useLocation()
  const locationState = location?.state as PokemonLocationState | undefined

  const [pokemonLocationId, setPokemonLocationId] = useState('')

  useEffect(() => {
    if (locationState?.id) setPokemonLocationId(locationState?.id)
  }, [locationState])

  const { actions, selectors } = useConnect()

  const { fetching, pokemons, pokemonsEntities, selectedPokemonId } = selectors

  const [selectedPokemon, setSelectedPokemon] = useState<DomainPokemon | undefined>(() => {
    const pokemon = pokemonsEntities?.[selectedPokemonId] as DomainPokemon
    return pokemon
  })

  useEffect(() => {
    if (!pokemons.length) actions.getPokemons()
  }, [])

  useEffect(() => {
    return () => {
      actions.setSelectedPokemon(selectedPokemon?.id || '')
    }
  }, [selectedPokemon])

  useEffect(() => {
    if (pokemonLocationId && pokemonLocationId !== selectedPokemon?.id) {
      const pokemon = pokemonsEntities[pokemonLocationId]
      if (pokemon) {
        if (!selectors.gettedPokemons[pokemon.id])
          actions.getPokemonById({
            id: pokemon.id,
            onSuccess: (pkm) => {
              setSelectedPokemon(pkm)
              setPokemonLocationId('')
            },
          })
        else {
          setSelectedPokemon(pokemon as DomainPokemon)
          setPokemonLocationId('')
        }
      }
    }
  }, [pokemonLocationId, pokemonsEntities])

  const handleSelectPokemon = (pkm: DomainPokemon) => () => {
    if (!selectors.gettedPokemons[pkm.id])
      actions.getPokemonById({ id: pkm.id, onSuccess: (pokemon) => setSelectedPokemon(pokemon) })
    else setSelectedPokemon(pkm)
  }

  return (
    <Box sx={styles.container}>
      <PageTitle label="Pokemons" />
      <Grid container spacing={2} flex={1} height="90%">
        <Grid container item xs={2.5} flexDirection="column" textAlign="center" height="100%">
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
