import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

const display = 'flex'

const styles = (theme: Theme) => {
  return createSxStyles({
    pageContainer: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
    },
    pageContent: {
      height: `calc(100vh - ${theme?.mixins?.toolbar?.minHeight}px)`,
      maxHeight: `calc(100vh - ${theme?.mixins?.toolbar?.minHeight}px)`,
      marginTop: `${theme?.mixins?.toolbar?.minHeight}px`,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'hidden',
      bgcolor: 'background.default',
      color: 'text.primary',
      p: 2,
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      fontSize: '100%',
    },
    circularProgressContainer: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(8),
    },
    circularProgress: { position: 'absolute', top: '50%', left: '50%' },
    circularProgressAction: { display: 'flex' },
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    inputContainer: { display, flexWrap: 'wrap' },
    form: { display, flexWrap: 'wrap', alignItems: 'center' },
    formContent: {
      marginRight: theme?.spacing(3),
      flexWrap: 'wrap',
      display,
      flexDirection: 'column',
      width: '85%',
    },
  })
}

export default styles
