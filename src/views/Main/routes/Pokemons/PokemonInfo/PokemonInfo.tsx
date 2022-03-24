import React, { useEffect, useMemo, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  UseAutocompleteProps
} from '@mui/material'
import { styled, useTheme } from '@mui/system'
import config from '@pokemon-portal/config'
import { DomainMove } from '@pokemon-portal/src/api/interfaces/Move'
import { DomainPokemon, DomainPokemonMove } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'
import { formatKg, formatMeters } from '@pokemon-portal/src/utils/masks'

import { useConnect } from './connect'
import { useStyles } from './styles'

type AutocompleteProps = UseAutocompleteProps<
  DomainPokemonMove,
  undefined,
  undefined,
  undefined
>['onChange']

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  pokemon: DomainPokemon
}

const PokemonInfo = (props: Props) => {
  const styles = useStyles(useTheme())
  const { pokemon } = props

  const { actions, selectors } = useConnect()

  const [selectedMove, setSelectedMove] = useState<DomainMove | null>(null)
  const [moveOpened, setMoveOpened] = useState(false)

  useEffect(() => {
    setMoveOpened(!!selectedMove)
  }, [selectedMove])

  const StyledListItemText = useMemo(() => styled(ListItemText)(styles.listeItemText), [styles])

  const handleSelectMove: AutocompleteProps = (evt, move) => {
    if (move) {
      const storeMove = selectors.moves[move.id]
      if (!storeMove) actions.getMoveById({ id: move.id, onSuccess: (mv) => setSelectedMove(mv) })
      else setSelectedMove(storeMove)
    } else setSelectedMove(move)
  }

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box display="flex">
          <List
            sx={styles.list}
            subheader={<Typography sx={styles.cardHeaderTitle}>{pokemon.name}</Typography>}
          >
            <ListItem alignItems="flex-start" sx={{ flex: 1 }}>
              <ListItemText
                sx={{ alignItems: 'flex-start' }}
                primary={`Type${pokemon.types?.length ? 's' : ''}`}
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
          </List>
          <img alt={pokemon.name} src={config.getOtherSprite(pokemon.id)} style={styles.avatar} />
        </Box>
        <Box>
          <Card sx={styles.moveCard}>
            <CardHeader
              sx={styles.moveCardHeader}
              onClick={() => setMoveOpened(!moveOpened)}
              action={
                <IconButton aria-label="expand" size="small" sx={{ verticalAlign: 'middle' }}>
                  {selectors.fetching ? (
                    <CircularProgress size={20} />
                  ) : moveOpened ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              }
              title={
                <Autocomplete<DomainPokemonMove>
                  id="auto-complete"
                  options={pokemon.moves || []}
                  getOptionLabel={(pkm) => pkm.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  sx={{ width: '50%' }}
                  renderInput={(params) => (
                    <TextField {...params} label="Moves" onClick={(evt) => evt.stopPropagation()} />
                  )}
                  size="small"
                  value={selectedMove}
                  onChange={handleSelectMove}
                  onClick={(evt) => evt.stopPropagation()}
                />
              }
            />
            <Collapse in={moveOpened} timeout="auto" unmountOnExit>
              {selectedMove && (
                <CardContent sx={styles.moveCardContent}>
                  <ListItem>
                    <ListItemText
                      sx={{ alignItems: 'flex-start' }}
                      primary={'Type'}
                      secondary={
                        selectedMove && (
                          <Chip
                            key={selectedMove?.type?.id}
                            label={selectedMove?.type?.name}
                            sx={[
                              styles.typeChip,
                              { bgcolor: TYPE_ID_COLORS[selectedMove.type?.id] },
                            ]}
                            size="small"
                          />
                        )
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                    <StyledListItemText primary="Accuracy" secondary={selectedMove?.accuracy} />
                    <StyledListItemText primary="Power" secondary={selectedMove?.power} />
                    <StyledListItemText primary="PP" secondary={selectedMove?.pp} />
                    <StyledListItemText primary="Priority" secondary={selectedMove?.priority} />
                    <StyledListItemText primary="Category" secondary={selectedMove?.damageClass} />
                    <StyledListItemText primary="Target" secondary={selectedMove?.target} />
                  </ListItem>
                  <ListItem>
                    <StyledListItemText primary="Effect" secondary={selectedMove?.effect} />
                  </ListItem>
                </CardContent>
              )}
            </Collapse>
          </Card>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PokemonInfo
