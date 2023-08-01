import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { ArrowForward as ArrowForwardIcon, ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Autocomplete,
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
  ListItemTextProps,
  TextField,
  Tooltip,
  UseAutocompleteProps,
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainListMove } from '@pokemon-portal/src/api/interfaces/domain/Move'
import { DomainPokemonMove } from '@pokemon-portal/src/api/interfaces/domain/Pokemon'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'

import { PATHS } from '../../../Main'
import { MOVES_PATHS } from '../../../routes/Moves/route'
import { useStyles } from './styles'

type AutocompleteOnChangeProps = UseAutocompleteProps<
  DomainPokemonMove,
  undefined,
  undefined,
  undefined
>['onChange']

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  fetching: boolean
  moves?: DomainPokemonMove[]
  move: DomainListMove | null
  onSelectMove: AutocompleteOnChangeProps
}

const PokemonMove = (props: Props) => {
  const styles = useStyles(useTheme())
  const { fetching, moves, move, onSelectMove } = props

  const navigate = useNavigate()

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  const [moveOpened, setMoveOpened] = useState(false)

  useEffect(() => {
    setMoveOpened(!!move)
  }, [move])

  const handleGoToDetails = () => {
    navigate(`${PATHS.moves}${MOVES_PATHS.details}`, { state: { id: move?.id } })
  }

  return (
    <Card sx={styles.cardContainer} elevation={5}>
      <CardHeader
        sx={styles.cardHeader}
        onClick={() => setMoveOpened(!moveOpened)}
        action={
          <>
            {move && (
              <Tooltip title="Go to details">
                <IconButton
                  aria-label="go-to-details"
                  size="small"
                  sx={{ verticalAlign: 'middle' }}
                  onClick={handleGoToDetails}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Tooltip>
            )}
            <IconButton aria-label="expand" size="small" sx={{ verticalAlign: 'middle' }}>
              {fetching ? (
                <CircularProgress size={20} />
              ) : moveOpened ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
          </>
        }
        title={
          <Autocomplete<DomainPokemonMove>
            id="auto-complete"
            options={moves || []}
            getOptionLabel={(pkm) => pkm.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: '35%', minWidth: '100px' }}
            renderInput={(params) => (
              <TextField {...params} label="Moves" onClick={(evt) => evt.stopPropagation()} />
            )}
            size="small"
            value={move}
            onChange={onSelectMove}
            onClick={(evt) => evt.stopPropagation()}
          />
        }
      />
      <Collapse in={moveOpened} timeout="auto" unmountOnExit>
        {move && (
          <CardContent sx={styles.moveCardContent}>
            <List sx={styles.list}>
              <ListItem sx={styles.listItem}>
                <ListItemText
                  sx={{ alignItems: 'flex-start' }}
                  primary={'Type'}
                  secondary={
                    move && (
                      <Chip
                        key={move?.type?.id}
                        label={move?.type?.name}
                        sx={[styles.typeChip, { bgcolor: TYPE_ID_COLORS[move.type?.id] }]}
                        size="small"
                      />
                    )
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <StyledListItemText primary="Power" secondary={move?.power} />
                <StyledListItemText primary="PP" secondary={move?.pp} />
                <StyledListItemText primary="Accuracy" secondary={move?.accuracy} />
                <StyledListItemText primary="Priority" secondary={move?.priority} />
                <StyledListItemText primary="Category" secondary={move?.damageClass} />
                <StyledListItemText primary="Target" secondary={move?.target} />
              </ListItem>
              <ListItem>
                <StyledListItemText primary="Effect" secondary={move?.effect} />
              </ListItem>
            </List>
          </CardContent>
        )}
      </Collapse>
    </Card>
  )
}

export default PokemonMove
