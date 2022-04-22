import React, { CSSProperties, memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import {
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  Typography,
  UseAutocompleteProps
} from '@mui/material'
import { useTheme } from '@mui/system'
import config from '@pokemon-portal/config'
import { DomainListMove } from '@pokemon-portal/src/api/interfaces/Move'
import { DomainPokemon, DomainPokemonMove } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'
import { formatKg, formatMeters } from '@pokemon-portal/src/utils/masks'

import { PATHS } from '../../../Main'
import { ABILITIES_PATHS } from '../../Abilities'
import { useConnect } from './connect'
import PokemonMove from './PokemonMove'
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

const PokemonInfo = memo((props: Props) => {
  const styles = useStyles(useTheme())
  const { pokemon } = props

  const navigate = useNavigate()

  const { actions, selectors } = useConnect()

  const { gettedMoves, moves } = selectors

  const [selectedMove, setSelectedMove] = useState<DomainListMove | null>(null)

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  const handleSelectMove: AutocompleteProps = (evt, move) => {
    if (move) {
      const storeMove = gettedMoves[move.id]
      if (!storeMove) actions.getMoveById({ id: move.id, onSuccess: (mv) => setSelectedMove(mv) })
      else {
        const mv = moves[move.id]
        if (mv) setSelectedMove(mv)
      }
    } else setSelectedMove(move)
  }

  const handleClickAbility = (ablId: string) => () => {
    navigate(PATHS.abilities + ABILITIES_PATHS.details, { state: { id: ablId } })
  }

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box display="flex">
          <List
            sx={styles.list}
            subheader={
              <Box display="flex" justifyContent="space-between">
                <Typography sx={styles.cardHeaderTitle}>{pokemon.name}</Typography>
                <Typography sx={styles.cardHeaderTitle}>
                  {`#${pokemon.id.padStart(4, '0')}`}
                </Typography>
              </Box>
            }
          >
            <ListItem alignItems="flex-start" sx={styles.listItem}>
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
                secondaryTypographyProps={{
                  sx: { display: 'flex' },
                  variant: 'button',
                }}
                secondary={pokemon.abilities?.map((abl, index, array) => (
                  <Typography
                    key={index}
                    sx={styles.abilityAnchor}
                    onClick={handleClickAbility(abl.id)}
                  >
                    {`${abl.name}${abl.isHidden ? ' (Hidden Ability)' : ''}${
                      index !== array.length - 1 ? ',' : ''
                    }`}
                  </Typography>
                ))}
              />
            </ListItem>
            <PokemonMove
              fetching={selectors.fetching}
              moves={pokemon.moves}
              move={selectedMove}
              onSelectMove={handleSelectMove}
            />
          </List>
          <img
            alt={pokemon.name}
            src={config.getOtherSprite(pokemon.id)}
            style={styles.avatar as CSSProperties}
          />
        </Box>
      </CardContent>
    </Card>
  )
})

export default PokemonInfo
