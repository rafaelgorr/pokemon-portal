import { Theme } from '@mui/material'
import sharedStyles from '@pokemon-portal/src/views/sharedStyles'
import { createSxStyles } from '@pokemon-portal/theme'

const styles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    pageTitle: {},
  })

export default styles
