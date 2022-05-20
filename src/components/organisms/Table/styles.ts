import { Theme } from '@mui/material/styles'
import { createSxStyles } from '@pokemon-portal/src/views/theme'

export const useStyles = (theme: Theme) => {
  return createSxStyles({
    tablePaper: {
      bottom: '10px',
      width: '100%',
      height: '100%',
      // flex: 1,
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    tableContent: {
      overflowY: 'auto',
      // height: 625,
    },
    tablePagination: {
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    },
    grow: { flexGrow: 1 },
    progress: {
      width: '2em !important',
      height: '2em !important',
    },
  })
}
