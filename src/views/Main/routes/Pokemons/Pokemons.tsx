import React, { useEffect, useState } from 'react'

import { Box, CircularProgress, Grid, useTheme } from '@mui/material'
import config from '@pokemon-portal/config'
import { DomainListPokemon, DomainPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { ListWithSearch, PageTitle } from '@pokemon-portal/src/components'

import { useConnect } from './connect'
import PokemonInfo from './PokemonInfo'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {}

const Pokemons = (props: Props) => {
  const styles = useStyles(useTheme())
  const { actions, selectors } = useConnect()

  const [selectedPokemon, setSelectedPokemon] = useState<DomainPokemon | undefined>()

  const handleSelectPokemon = (pkm: DomainPokemon) => () => {
    if (!selectors.gettedPokemons[pkm.id])
      actions.getPokemonById({ id: pkm.id, onSuccess: (pokemon) => setSelectedPokemon(pokemon) })
    else setSelectedPokemon(pkm)
  }

  useEffect(() => {
    if (!selectors.pokemons.length) actions.getPokemons()
  }, [])

  const { fetching, pokemons } = selectors

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
