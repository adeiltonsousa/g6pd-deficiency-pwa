// Packages
import React from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ isOpen = true, msg = 'Carregando...' }) => {
  return (
    <Dialog maxWidth="xs" open={isOpen} aria-labelledby="loading-dialog-title">
      <DialogContent style={{ display: 'flex' }}>
        <CircularProgress size={30} />
        <DialogContentText style={{ padding: '5px', marginLeft: '10px' }}>
          {msg}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
