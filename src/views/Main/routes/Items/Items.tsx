// import React from 'react'

// import { Box, Grid, TextField, TextFieldProps, useTheme } from '@mui/material'
// import { PageTitle } from '@pokemon-portal/src/components'
// import { useFuse } from '@pokemon-portal/src/utils/hooks/fuse'

// import { useStyles } from './styles'

// type ExtendedProps = Record<string, unknown>

// interface Props extends ExtendedProps {}

// const Items = (props: Props) => {
//   const styles = useStyles(useTheme())

//   const {
//     filteredItems: filteredAbilities,
//     search,
//     setSearch,
//   } = useFuse({ items: moves, fuseKeys: ['name'] })

//   const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
//     setSearch(evt.target.value)
//   }

//   return (
//     <Box sx={styles.container}>
//       <PageTitle label="Items" />
//       <Grid container direction="column" sx={styles.gridContainer}>
//         <Grid item xs={1} sx={styles.searchGridItem}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search"
//             value={search}
//             onChange={handleChangeSearch}
//             sx={styles.searchText}
//             focused
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon color="primary" />
//                 </InputAdornment>
//               ),
//               endAdornment: search ? (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setSearch('')}>
//                     <ClearOutlined color="primary" />
//                   </IconButton>
//                 </InputAdornment>
//               ) : undefined,
//             }}
//             // disabled={fetching}
//           />
//         </Grid>
//         <Grid item xs="auto" sx={styles.tableGridItem}>
//           <Table<DomainListMove>
//             columns={tableColunms}
//             keys={tableKeys}
//             data={filteredAbilities}
//             // renderCollapse={renderCollapse}
//             fetching={selectors.fetching}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }

// export default Items
