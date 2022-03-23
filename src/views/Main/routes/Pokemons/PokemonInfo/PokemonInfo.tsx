import React, { useMemo } from 'react'

import {
  Autocomplete,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField
} from '@mui/material'
import { styled, useTheme } from '@mui/system'
import config from '@pokemon-portal/config'
import { DomainPokemon, DomainPokemonMove } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'
import { formatKg, formatMeters } from '@pokemon-portal/src/utils/masks'

import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  pokemon: DomainPokemon
}

const PokemonInfo = (props: Props) => {
  const styles = useStyles(useTheme())
  const { pokemon } = props

  const StyledListItemText = useMemo(() => styled(ListItemText)(styles.listeItemText), [styles])

  return (
    <Paper sx={styles.paper}>
      <Box display="flex">
        <List sx={{ flex: 1 }}>
          <ListItem alignItems="center" sx={{ flexWrap: 'wrap' }}>
            <ListItemText
              sx={{ alignItems: 'flex-start' }}
              primary={pokemon.name}
              secondary={pokemon.types?.map((type) => (
                <Chip
                  key={type.id}
                  label={type.name}
                  sx={[styles.typeChip, { bgcolor: TYPE_ID_COLORS[type.id] }]}
                  size="small"
                />
              ))}
              secondaryTypographyProps={{ component: 'div' }}
            />
            <StyledListItemText primary="Height" secondary={formatMeters(pokemon.height)} />
            <StyledListItemText primary="Weight" secondary={formatKg(pokemon.weight)} />
            <StyledListItemText
              primary="Abilities"
              secondary={pokemon.abilities
                ?.map((abl) => `${abl.name}${abl.isHidden ? ' (Hidden Ability)' : ''}`)
                .join(', ')}
            />
          </ListItem>
          <ListItem alignItems="center">
            <Autocomplete<DomainPokemonMove>
              id="auto-complete"
              options={pokemon.moves || []}
              getOptionLabel={(pkm) => pkm.name}
              sx={{ width: '25%' }}
              renderInput={(params) => <TextField {...params} label="Moves" />}
              size="small"
            />
          </ListItem>
        </List>
        <img alt={pokemon.name} src={config.getOtherSprite(pokemon.id)} style={styles.avatar} />
      </Box>
    </Paper>
  )
}

export default PokemonInfo
