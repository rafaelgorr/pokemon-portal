import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/src/views/theme'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    patientsGrid: { display: 'flex', flexDirection: 'colunm' },
    listItem: {
      cursor: 'pointer',
      '& .Mui-selected': {
        bgcolor: 'primary.main',
      },
    },
    progressContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    searchFieldContainer: {
      position: 'relative',
    },
    listContainer: {
      flex: '1 1 auto',
      overflow: 'auto',
      marginTop: theme.spacing(1),
    },
    list: { width: '100%' },
    avatar: { width: theme.spacing(6), height: theme.spacing(6), marginRight: theme.spacing(2) },
    linearProgress: { bottom: 0, margin: 0, width: '100%', position: 'absolute' },
    searchTextField: { width: '100%' },
  })
