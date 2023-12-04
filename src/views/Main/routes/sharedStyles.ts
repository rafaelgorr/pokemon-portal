import { Theme } from '@mui/material'
import sharedStyles from '@pokemon-portal/src/views/sharedStyles'
import { createSxStyles } from '@pokemon-portal/theme'

const styles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    pageTitle: {},
    listItemText: {
      '.MuiListItemText-primary': {},
      '.MuiListItemText-secondary': {},
      marginRight: theme.spacing(1),
    },
    listItem: { flexWrap: 'wrap' },
    gridContainer: { height: '92%' },
    searchGridItem: { minHeight: '48px', height: '9%', display: 'flex' },
    tableGridItem: { height: '91%' },
    searchText: { width: '20%' },
  })

export default styles
