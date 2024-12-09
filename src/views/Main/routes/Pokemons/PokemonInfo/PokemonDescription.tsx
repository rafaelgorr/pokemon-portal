import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  TextField,
  useTheme,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import { useStyles } from './styles'
import {
  DomainPokemonSpecies,
  DomainPokemonSpeciesFlavorTextEntry,
} from '../../../../../api/interfaces'

interface PokemonDescriptionProps {
  species: DomainPokemonSpecies
}

export const PokemonDescription = (props: PokemonDescriptionProps) => {
  const styles = useStyles(useTheme())

  const [flavorTextEntry, setFlavorTextEntry] =
    useState<DomainPokemonSpeciesFlavorTextEntry | null>(null)

  const [collapsed, setCollapsed] = useState(false)

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => (
      <ListItemText {...props} sx={styles.listItemText} />
    ),
    [styles],
  )

  useEffect(() => {
    setCollapsed(!!flavorTextEntry)
  }, [flavorTextEntry])

  return (
    <Card sx={styles.cardContainer} elevation={5}>
      <CardHeader
        sx={styles.cardHeader}
        // onClick={() => setCollapsed(!collapsed)}
        title={
          <Autocomplete<DomainPokemonSpeciesFlavorTextEntry>
            id="auto-complete"
            options={props.species.flavorTextEntries ?? []}
            getOptionLabel={(option) => option.version}
            isOptionEqualToValue={(option, value) =>
              option.version === value.version
            }
            sx={{ width: '35%', minWidth: '100px' }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Description versions"
                onClick={(evt) => evt.stopPropagation()}
              />
            )}
            size="small"
            value={flavorTextEntry}
            onChange={(_, value) => setFlavorTextEntry(value)}
          />
        }
      />
      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        {flavorTextEntry && (
          <CardContent sx={styles.moveCardContent}>
            <List sx={styles.list}>
              <ListItem sx={styles.listItem}>
                <StyledListItemText
                  primary="Description"
                  secondary={flavorTextEntry.flavorText}
                />
              </ListItem>
            </List>
          </CardContent>
        )}
      </Collapse>
    </Card>
  )
}
