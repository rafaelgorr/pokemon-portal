import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import {
  Box,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps
} from '@mui/material'
import { useTheme } from '@mui/system'
import config from '@pokemon-portal/config'
import { DomainListMove, DomainMove } from '@pokemon-portal/src/api/interfaces/Move'
import { DomainListPokemon } from '@pokemon-portal/src/api/interfaces/Pokemon'
import { ListWithSearch, PageTitle } from '@pokemon-portal/src/components'
import { TYPE_ID_COLORS } from '@pokemon-portal/src/constants/pokemon'

import { PATHS } from '../../../Main'
import { useConnect } from './connect'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  moveId: string
}

const Details = (props: Props) => {
  const styles = useStyles(useTheme())

  const { moveId } = props

  const { selectors, actions } = useConnect()

  const { fetching, moves, gettedMoves: gettedAbilities } = selectors

  const [move, setMove] = useState<DomainMove | null>(null)

  useEffect(() => {
    if (!gettedAbilities[moveId])
      actions.getMoveById({ id: moveId, onSuccess: (mv) => setMove(mv) })
    else setMove(moves[moveId] as DomainMove)
  }, [moveId, moves, gettedAbilities])

  const StyledListItemText = useCallback(
    (props: ListItemTextProps) => <ListItemText {...props} sx={styles.listItemText} />,
    [styles]
  )

  const navigate = useNavigate()

  const handleSelectPokemon = (pkm: DomainListMove) => () => {
    if (pkm.id) navigate(PATHS.pokemons, { state: { id: pkm.id } })
  }

  if (fetching) return <CircularProgress sx={styles.circularProgress} />

  return (
    <Box sx={styles.container}>
      <PageTitle label={move?.name || ''} />
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
      <ListWithSearch<DomainListPokemon>
        listItems={move?.learnedByPokemon || []}
        listItemProps={{
          getPrimary: (pkm) => pkm.name,
          getAvatarSrc: (pkm) => config.getOtherSprite(pkm.id),
        }}
        handleItemClick={handleSelectPokemon}
        fuseKeys={['name', 'id']}
        fetching={fetching}
        sx={styles.pokemonList}
        textFieldLabel="Pokemons"
        emptyListLabel="No pokemons found.."
      />
    </Box>
  )
}

export default Details
