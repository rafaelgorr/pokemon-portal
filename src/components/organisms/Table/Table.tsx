import { Warning as WarningIcon } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Collapse,
  CollapseProps as MuiCollapseProps,
  Paper,
  PaperProps,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TablePagination,
  TableProps,
  TableRow as MuiRow,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useMemo, useState } from 'react'

import { useCollapseRow } from './hooks'
import { useStyles } from './styles'

export interface TableRow {
  id: string
}

export type CollapseBoxProps<T> = {
  data: T
} & Pick<MuiCollapseProps, 'in'>

export type TableKeys<T extends TableRow> = (
  | keyof T
  | ((object: T, selected: boolean, index: number) => React.ReactNode)
)[]

interface Props<T extends TableRow> {
  className?: string
  tableClassName?: string
  columns: string[]
  data: T[]
  keys: TableKeys<T>
  fetching?: boolean
  selectedRow?: T
  selectedRows?: string[]
  size?: TableProps['size']
  onRowClick?(row: T): void
  elevation?: PaperProps['elevation']
  renderCollapse?: (data: T) => React.ReactElement
  sx?: TableContainerProps['sx']
}

interface EmptyDataProps {
  message: string
}

const EmptyData = ({ message }: EmptyDataProps) => (
  <Box display="flex" flexDirection="column">
    <div>
      <WarningIcon />
    </div>
    <div>{message}</div>
  </Box>
)

function Table<T extends TableRow>(props: Props<T>) {
  const {
    data,
    columns: headers,
    keys,
    onRowClick,
    selectedRow,
    fetching,
    selectedRows,
    elevation = 5,
    renderCollapse,
    sx,
  } = props
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const styles = useStyles(useTheme())

  const isRowCollapsible = useMemo(() => !!renderCollapse, [renderCollapse])

  const { collapses, setCollapse } = useCollapseRow(data, isRowCollapsible)

  useEffect(() => {
    setPage(0)
  }, [data.length])

  const progress = fetching ? (
    <MuiRow>
      <TableCell colSpan={headers.length} align="center">
        <CircularProgress sx={styles.progress} />
      </TableCell>
    </MuiRow>
  ) : undefined
  const emptyData =
    data.length === 0 ? (
      <MuiRow>
        <TableCell colSpan={headers.length} align="center">
          <EmptyData message="No data found..." />
        </TableCell>
      </MuiRow>
    ) : undefined

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value))
    setPage(0)
  }

  const handleRowClick = (row: T) => (ev: any) => {
    if (onRowClick) onRowClick(row)
    setCollapse(row.id)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ ...sx, ...styles.tablePaper }}
      elevation={elevation}
    >
      <Box sx={styles.tableContent}>
        <MuiTable
          size={props.size}
          stickyHeader
          aria-label="table-data"
          // sx={{ bgcolor: 'background.default' }}
        >
          <TableHead>
            <MuiRow>
              {headers.map((head, i) => (
                <TableCell key={i}>{head}</TableCell>
              ))}
            </MuiRow>
          </TableHead>
          <TableBody>
            {progress ??
              emptyData ??
              (rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : data
              ).map((row, i) => {
                const rowSelected =
                  !!onRowClick &&
                  (selectedRow
                    ? selectedRow === row
                    : selectedRows && selectedRows.includes(row.id))
                return (
                  <React.Fragment key={row.id}>
                    <MuiRow
                      style={{ cursor: onRowClick ? 'pointer' : undefined }}
                      hover={!!onRowClick}
                      onClick={handleRowClick(row)}
                      selected={rowSelected}
                    >
                      {keys.map((k, j) => {
                        if (typeof k !== 'function') {
                          return (
                            <TableCell
                              align={j !== 0 ? 'left' : undefined}
                              key={`${i}-key-${row.id}-${j}}`}
                            >
                              {row[k] as unknown as React.ReactNode}
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell
                            align={j !== 0 ? 'left' : undefined}
                            key={`${i}-key-${row.id}-${j}}`}
                          >
                            {k(row, !!rowSelected, i)}
                          </TableCell>
                        )
                      })}
                    </MuiRow>
                    {isRowCollapsible && (
                      <MuiRow>
                        <TableCell
                          sx={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse in={collapses[row.id]}>
                            {renderCollapse?.(row)}
                          </Collapse>
                        </TableCell>
                      </MuiRow>
                    )}
                  </React.Fragment>
                )
              })}
          </TableBody>
        </MuiTable>
      </Box>
      <div style={styles.grow} />
      <TablePagination
        sx={styles.tablePagination}
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={3}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page > 0 && data.length <= rowsPerPage ? 0 : page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => {
          return `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
        }}
        // labelRowsPerPage="Rows per page"
        SelectProps={{
          inputProps: { 'aria-label': 'Rows per page:' },
          native: true,
        }}
      />
    </TableContainer>
  )
}

export { Table }
