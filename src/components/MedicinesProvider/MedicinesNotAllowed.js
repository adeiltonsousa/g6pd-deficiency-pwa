import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

import { getMedicinesNotAllowed } from '../../services/api';

import Loading from '../Loading';

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 7.5,
    marginBottom: theme.spacing.unit * 3,
    borderRadius: '0',
    overflowX: 'auto'
  },
  row: {
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      cursor: 'pointer'
    }
  }
});

class MedicinesNotAllowed extends Component {
  state = {
    open: false,
    loading: false,
    rows: [],
    row: {}
  };

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.getMedicinesNotAllowed();
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  getMedicinesNotAllowed = async () => {
    const response = await getMedicinesNotAllowed().then(response => {
      return response;
    });

    this.setState({ loading: false, rows: response });
  };

  showMedicineInfo = row => {
    this.setState({ open: true, row });
  };

  render() {
    const { classes } = this.props;
    const { open, loading, rows, row } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell align="left">Substância Ativa</CustomTableCell>
              <CustomTableCell align="left">Categoria</CustomTableCell>
              <CustomTableCell align="center">Nome Comercial</CustomTableCell>
              <CustomTableCell align="center">Fabricante</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow
                  className={classes.row}
                  key={row.id}
                  onClick={() => this.showMedicineInfo(row)}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.activeSubstance}
                  </TableCell>
                  <TableCell align="left">{row.category}</TableCell>
                  <TableCell align="center">
                    {row.commercialName.join(', ')}
                  </TableCell>
                  <TableCell align="center">
                    {row.manufacturer.join(', ')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Dialog
          fullWidth={true}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{row.category}</DialogTitle>
          <DialogContent />
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

MedicinesNotAllowed.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(MedicinesNotAllowed));
