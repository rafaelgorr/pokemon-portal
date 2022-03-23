import React from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import TestComponent from '../src/components/atoms/TestComponent'

test('click test', async () => {
  render(<TestComponent label="Test Button" onClick={() => console.log('Test')} />)
  fireEvent.click(screen.getByText('Test Button'))

  await waitFor(() => screen.getByRole('button'))
})
