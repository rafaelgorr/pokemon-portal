import React, { lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import PokeAvatar from '../src/components/atoms/PokeAvatar'
import DrawerItems, { DrawerItem } from '../src/components/molecules/DrawerItems'

const exoticComponent = lazy(() => new Promise(() => React.createElement('div')))

test('click test', async () => {
  const drawerItemsMock = jest.fn<DrawerItem, number[]>((item) => ({
    Component: exoticComponent,
    Icon: PokeAvatar,
    label: `Drawer Item ${item + 1}`,
    path: `Path ${item + 1}`,
  }))

  console.log(drawerItemsMock.mock.instances)

  render(
    <ThemeProvider theme={createTheme()}>
      <BrowserRouter>
        <DrawerItems drawerListItems={drawerItemsMock.mock.instances} />
      </BrowserRouter>
    </ThemeProvider>,
  )
  fireEvent.click(screen.getByText('Test Button'))

  await waitFor(() => screen.getByRole('button'))
})
