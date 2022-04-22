import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'

import { ClearOutlined, Details as DetailsIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  IconButton,
  IconButtonProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip
} from '@mui/material'
import { useTheme } from '@mui/system'
import { DomainListMove } from '@pokemon-portal/src/api/interfaces/Move'
import { PageTitle, Table } from '@pokemon-portal/src/components'
import { useFuse } from '@pokemon-portal/utils/hooks/fuse'

import { useConnect } from './connect'
import { MOVES_PATHS } from './route'
import { useStyles } from './styles'

type ExtendedProps = Record<string, unknown>

const tableColunms = ['Id', 'Name', 'Details']

interface Props extends ExtendedProps {}

const Moves = (props: Props) => {
  const styles = useStyles(useTheme())

  const navigate = useNavigate()

  const { actions, selectors } = useConnect()

  const [clickedId, setClickedId] = useState('') // need this to put the progress only on the row of the clicked item

  const { moves, gettedMoves, gettingMove, fetched } = selectors

  useEffect(() => {
    if (!fetched) actions.getMoves()
  }, [])

  const {
    filteredItems: filteredAbilities,
    search,
    setSearch,
  } = useFuse({ items: moves, fuseKeys: ['name'] })

  const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
    setSearch(evt.target.value)
  }

  const tableKeys = useMemo(() => {
    const id = (mv: DomainListMove) => mv.id
    const name = (mv: DomainListMove) => mv.name

    const mapActionToAction = (mv: DomainListMove) => {
      const handleClickDetails =
        (mv: DomainListMove): IconButtonProps['onClick'] =>
        (evt) => {
          setClickedId(mv.id)
          const navigateToDetail = (id: string) =>
            navigate(`.${MOVES_PATHS.details}`, { state: { id } })
          if (!gettedMoves[mv.id])
            actions.getMoveById({
              id: mv.id,
              onSuccess: ({ id }) => navigateToDetail(id),
            })
          else navigateToDetail(mv.id)

          evt.stopPropagation()
        }

      return !(gettingMove && clickedId === mv.id) ? (
        <Tooltip title="Details">
          <IconButton color="primary" onClick={handleClickDetails(mv)}>
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <IconButton sx={styles.circularProgressAction}>
          <CircularProgress size={22} />
        </IconButton>
      )
    }

    return [id, name, mapActionToAction]
  }, [moves, gettedMoves])

  return (
    <Box sx={styles.container}>
      <PageTitle label="Moves" />
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
      <Table<DomainListMove>
        columns={tableColunms}
        keys={tableKeys}
        data={filteredAbilities}
        // renderCollapse={renderCollapse}
        fetching={selectors.fetching}
      />
    </Box>
  )
}

export default Moves
