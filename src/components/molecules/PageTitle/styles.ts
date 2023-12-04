import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/src/views/theme'

const styles = (theme: Theme) =>
  createSxStyles({
    container: { height: '8%', minHeight: '64px' },
    divider: { margin: `${theme.spacing(2)} 0px ${theme.spacing(2)} 0px` },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  })

export default styles
