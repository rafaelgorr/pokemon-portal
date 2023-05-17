import dayjs from 'dayjs'
import React from 'react'

import { Box, BoxProps, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/system'

import useStyles from './styles'

type Props = BoxProps & {
  label: string
}

const PageTitle = (props: Props) => {
  const styles = useStyles(useTheme())
  const { label, ...boxProps } = props

  return (
    <Box {...boxProps} sx={styles.container}>
      <Box sx={styles.titleContainer}>
        <Typography variant="h4" color="primary">
          {label}
        </Typography>
        <Typography>{dayjs().format('MMMM, YYYY')}</Typography>
      </Box>
      <Divider sx={styles.divider} />
    </Box>
  )
}

export { PageTitle }
