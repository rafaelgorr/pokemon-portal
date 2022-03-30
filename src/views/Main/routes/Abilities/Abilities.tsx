import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'

import { ClearOutlined, Details as DetailsIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainListAbility } from '@pokemon-portal/src/api/interfaces/Ability'
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
  const { abilities } = selectors

  const navigate = useNavigate()

  const {
    filteredItems: filteredAbilities,
    search,
    setSearch,
  } = useFuse({
    items: abilities,
    fuseKeys: ['name'],
  })

  const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
    setSearch(evt.target.value)
  }

  useEffect(() => {
    if (!abilities.length) actions.getAbilities()
  }, [])

  const tableKeys = useMemo(() => {
    const id = (abl: DomainListAbility) => abl.id
    const name = (abl: DomainListAbility) => abl.name

    const mapActionToAction = (abl: DomainListAbility) =>
      !selectors.gettingAbility ? (
        <Tooltip title="Details">
          <IconButton
            color="primary"
            onClick={(evt) => {
              actions.getAbilityById({
                id: abl.id,
                onSuccess: ({ id }) => navigate(`.${ABILITIES_PATHS.details}`, { state: { id } }),
              })

              evt.stopPropagation()
            }}
          >
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <CircularProgress />
      )

    return [id, name, mapActionToAction]
  }, [abilities])

  return (
    <Box sx={styles.container}>
      <PageTitle label="Abilities" />
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        value={search}
        onChange={handleChangeSearch}
        sx={{ width: '20%' }}
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
      <Table<DomainListAbility>
        columns={tableColunms}
        keys={tableKeys}
        data={filteredAbilities}
        // renderCollapse={renderCollapse}
        fetching={selectors.fetching}
      />
    </Box>
  )
}

export default Abilities
