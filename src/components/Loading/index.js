import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';

export default () => {
  return (
    <Dialog maxWidth="xs" open={true} aria-labelledby="loading-dialog-title">
      <DialogContent style={{ display: 'flex' }}>
        <CircularProgress size={30} />
        <DialogContentText style={{ padding: '5px', marginLeft: '10px' }}>
          Carregando...
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
