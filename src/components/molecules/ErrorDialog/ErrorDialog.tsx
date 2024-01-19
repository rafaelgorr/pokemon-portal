import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useEffect, useState } from 'react'

interface Props {
  error: string
  setError: (error: string) => void
}

const ErrorDialog = (props: Props) => {
  const { error, setError } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (error) setVisible(true)
  }, [props.error])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      setError('')
    }, 200)
  }
  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      id="error-dialog"
      aria-labelledby="error-dialog"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText>{error}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { ErrorDialog }
