import React, { useMemo } from 'react'

import { Avatar, AvatarProps } from '@mui/material'
import config from '@pokemon-portal/config'

type ExtendedProps = AvatarProps

interface Props extends ExtendedProps {}

const PokeAvatar = (props: Props) => {
  const src = useMemo(
    () => config.getOtherSprite(Math.ceil((Math.random() * 1000) % 251).toString()),
    []
  )
  return <Avatar {...props} src={src} variant="square" />
}

export default PokeAvatar
