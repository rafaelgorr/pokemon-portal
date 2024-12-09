import { Theme } from '@mui/material/styles'
import { drawerWidth } from '@pokemon-portal/constants/styles'
import { createSxStyles } from '@pokemon-portal/theme'

import sharedStyles from '../sharedStyles'

export default (theme: Theme) => {
  return createSxStyles({
    ...sharedStyles(theme),
    appTitle: {
      flexGrow: 1,
      fontSize: '100%',
      textTransform: 'uppercase',
      color: 'white',
    },
    titleAnchor: { cursor: 'pointer', display: { xs: 'none', sm: 'block' } },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
      boxShadow: 0,
    },
    notificationBadge: {
      '& .MuiBadge-badge': {
        fontSize: 'large',
      },
    },
    searchInput: {
      flexGrow: 2,
      bgcolor: 'info.main',
      borderRadius: '7px',
      '& .MuiInputBase-input': {
        color: 'primary.main',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          color: 'primary.main',
          borderWidth: '0px',
        },
        '&:hover fieldset': {
          borderColor: 'info.main',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'info.main',
        },
        '& ::-webkit-input-placeholder': {
          color: 'primary.main',
        },
      },
    },
  })
}
