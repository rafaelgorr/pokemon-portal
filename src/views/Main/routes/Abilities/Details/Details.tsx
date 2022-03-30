import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainAbility } from '@pokemon-portal/src/api/interfaces/Ability'

import { useConnect } from './connect'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  abilityId: string
}

const Details = (props: Props) => {
  const styles = useStyles(useTheme())
  const { abilityId } = props

  const { selectors, actions } = useConnect()

  const { fetching } = selectors

  const [ability, setAbility] = useState<DomainAbility | null>(null)

  useEffect(() => {
    const entAbl = selectors.abilities[abilityId]
    if (!entAbl) actions.getAbilityById({ id: abilityId, onSuccess: (abl) => setAbility(abl) })
    else setAbility(entAbl as DomainAbility)
  }, [abilityId, selectors.abilities])

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  if (fetching) return <CircularProgress sx={styles.circularProgress} />

  return (
    <Box sx={styles.container}>
      <Typography variant="h4">{ability?.name}</Typography>
      <List sx={styles.list}>
        <ListItem sx={styles.listItem}>
          <StyledListItemText primary="Generation" secondary={ability?.generation?.name} />
          <StyledListItemText primary="Main Series" secondary={ability?.isMainSeries} />
        </ListItem>
        <ListItem sx={styles.listItem}>
          <StyledListItemText primary="Effect" secondary={ability?.effect} />
        </ListItem>
      </List>
    </Box>
  )
}

export default Details
