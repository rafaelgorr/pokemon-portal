import React, { useCallback, useEffect, useState } from 'react'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
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
  UseAutocompleteProps
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainMove } from '@pokemon-portal/src/api/interfaces/Move'
import { DomainPokemonMove } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'

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
  selectedMove: DomainMove | null
  onSelectMove: AutocompleteOnChangeProps
}

const PokemonMove = (props: Props) => {
  const styles = useStyles(useTheme())
  const { fetching, moves, selectedMove, onSelectMove } = props

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  const [moveOpened, setMoveOpened] = useState(false)

  useEffect(() => {
    setMoveOpened(!!selectedMove)
  }, [selectedMove])

  return (
    <Card sx={styles.moveCard} elevation={5}>
      <CardHeader
        sx={styles.moveCardHeader}
        onClick={() => setMoveOpened(!moveOpened)}
        action={
          <IconButton aria-label="expand" size="small" sx={{ verticalAlign: 'middle' }}>
            {fetching ? (
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
            options={moves || []}
            getOptionLabel={(pkm) => pkm.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ width: '35%', minWidth: '100px' }}
            renderInput={(params) => (
              <TextField {...params} label="Moves" onClick={(evt) => evt.stopPropagation()} />
            )}
            size="small"
            value={selectedMove}
            onChange={onSelectMove}
            onClick={(evt) => evt.stopPropagation()}
          />
        }
      />
      <Collapse in={moveOpened} timeout="auto" unmountOnExit>
        {selectedMove && (
          <CardContent sx={styles.moveCardContent}>
            <List sx={styles.list}>
              <ListItem sx={styles.listItem}>
                <ListItemText
                  sx={{ alignItems: 'flex-start' }}
                  primary={'Type'}
                  secondary={
                    selectedMove && (
                      <Chip
                        key={selectedMove?.type?.id}
                        label={selectedMove?.type?.name}
                        sx={[styles.typeChip, { bgcolor: TYPE_ID_COLORS[selectedMove.type?.id] }]}
                        size="small"
                      />
                    )
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <StyledListItemText primary="Power" secondary={selectedMove?.power} />
                <StyledListItemText primary="PP" secondary={selectedMove?.pp} />
                <StyledListItemText primary="Accuracy" secondary={selectedMove?.accuracy} />
                <StyledListItemText primary="Priority" secondary={selectedMove?.priority} />
                <StyledListItemText primary="Category" secondary={selectedMove?.damageClass} />
                <StyledListItemText primary="Target" secondary={selectedMove?.target} />
              </ListItem>
              <ListItem>
                <StyledListItemText primary="Effect" secondary={selectedMove?.effect} />
              </ListItem>
            </List>
          </CardContent>
        )}
      </Collapse>
    </Card>
  )
}

export default PokemonMove
