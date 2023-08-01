import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClearOutlined, Details as DetailsIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  IconButtonProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainListAbility } from '@pokemon-portal/src/api/interfaces/domain/Ability'
import { PageTitle, Table } from '@pokemon-portal/src/components'
import { useFuse } from '@pokemon-portal/src/utils/hooks/fuse'

import { useConnect } from './connect'
import { ABILITIES_PATHS } from './route'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {}

const tableColunms = ['Id', 'Name', 'Details']
const Abilities = (props: Props) => {
  const styles = useStyles(useTheme())

  const { actions, selectors } = useConnect()
  const { abilities, gettedAbilities, gettingAbility, fetched } = selectors

  const [clickedId, setClickedId] = useState('') // needed this to put the progress only on the row of the clicked item

  const navigate = useNavigate()

  const {
    filteredItems: filteredAbilities,
    search,
    setSearch,
  } = useFuse({ items: abilities, fuseKeys: ['name'] })

  const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    if (!fetched) actions.getAbilities()
  }, [])

  const tableKeys = useMemo(() => {
    const id = (abl: DomainListAbility) => abl.id
    const name = (abl: DomainListAbility) => abl.name

    const mapActionToAction = (abl: DomainListAbility) => {
      const handleClickDetails =
        (abl: DomainListAbility): IconButtonProps['onClick'] =>
        (evt) => {
          setClickedId(abl.id)
          const navigateToDetail = (id: string) =>
            navigate(`.${ABILITIES_PATHS.details}`, { state: { id } })
          if (!gettedAbilities[abl.id])
            actions.getAbilityById({
              id: abl.id,
              onSuccess: ({ id }) => navigateToDetail(id),
            })
          else navigateToDetail(abl.id)

          evt.stopPropagation()
        }

      return !(gettingAbility && clickedId === abl.id) ? (
        <Tooltip title="Details">
          <IconButton color="primary" onClick={handleClickDetails(abl)}>
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton sx={styles.circularProgressAction}>
          <CircularProgress size={20} />
        </IconButton>
      )
    }

    return [id, name, mapActionToAction]
  }, [abilities, gettedAbilities])

  return (
    <Box sx={styles.container}>
      <PageTitle label="Abilities" />
      <Grid container direction="column" sx={styles.gridContainer}>
        <Grid item xs={1} sx={styles.searchGridItem}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={search}
            onChange={handleChangeSearch}
            sx={styles.searchText}
            focused
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch('')}>
                    <ClearOutlined color="primary" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            }}
            // disabled={fetching}
          />
        </Grid>
        <Grid item xs="auto" sx={styles.tableGridItem}>
          <Table<DomainListAbility>
            columns={tableColunms}
            keys={tableKeys}
            data={filteredAbilities}
            // renderCollapse={renderCollapse}
            fetching={selectors.fetching}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Abilities
