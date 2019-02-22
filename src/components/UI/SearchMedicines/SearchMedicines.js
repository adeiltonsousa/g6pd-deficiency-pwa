// Packages
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

class SearchMedicines extends Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleFilter = () => {
    const filter = this.filter.value;

    this.props.onFilter(filter);
    this.handleClose();
  };

  render() {
    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.handleOpen}>
          <SearchIcon />
        </IconButton>

        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Pesquisar Medicamentos
          </DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              id="medicamentos"
              label="Medicamento"
              margin="dense"
              inputRef={input => (this.filter = input)}
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button color="primary" onClick={this.handleFilter}>
              Pesquisar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

SearchMedicines.propTypes = {
  onFilter: PropTypes.func.isRequired
};

export default SearchMedicines;
