import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps
} from '@mui/material'
import { useTheme } from '@mui/system'
import config from '@pokemon-portal/config'
import { DomainAbility } from '@pokemon-portal/src/api/interfaces/Ability'
import { DomainListPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { ListWithSearch, PageTitle } from '@pokemon-portal/src/components'

import { PATHS } from '../../../Main'
import { useConnect } from './connect'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  abilityId: string
}

const Details = (props: Props) => {
  const styles = useStyles(useTheme())
  const { abilityId } = props

  const navigate = useNavigate()

  const { selectors, actions } = useConnect()

  const { fetching, abilities, gettedAbilities } = selectors

  const [ability, setAbility] = useState<DomainAbility | null>(null)

  useEffect(() => {
    if (!gettedAbilities[abilityId])
      actions.getAbilityById({ id: abilityId, onSuccess: (abl) => setAbility(abl) })
    else setAbility(abilities[abilityId] as DomainAbility)
  }, [abilityId, selectors.abilities])

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  const handleSelectPokemon = (pkm: DomainListPokemon) => () => {
    if (pkm.id) navigate(PATHS.pokemons, { state: { id: pkm.id } })
  }

  if (fetching) return <CircularProgress sx={styles.circularProgress} />

  return (
    <Box sx={styles.container}>
      <PageTitle label={ability?.name || ''} />
      <List sx={styles.list}>
        <ListItem sx={styles.listItem}>
          <StyledListItemText primary="Generation" secondary={ability?.generation?.name} />
          <StyledListItemText primary="Main Series" secondary={ability?.isMainSeries} />
        </ListItem>
        <ListItem sx={styles.listItem}>
          <StyledListItemText primary="Effect" secondary={ability?.effect} />
        </ListItem>
      </List>
      <ListWithSearch<DomainListPokemon>
        listItems={ability?.pokemons || []}
        listItemProps={{
          getPrimary: (pkm) => pkm.name,
          getAvatarSrc: (pkm) => config.getOtherSprite(pkm.id),
        }}
        handleItemClick={handleSelectPokemon}
        fuseKeys={['name', 'id']}
        fetching={fetching}
        sx={styles.pokemonList}
        textFieldLabel="Pokemons"
        emptyListLabel="No pokemons found..."
      />
    </Box>
  )
}

export default Details
