// Packages
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import removeAccents from 'desacentuador';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

// Services
import { getMedicinesNotAllowed } from '../../services/api';

// UI
import Loading from '../UI//Loading';

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
  },
  label: {
    fontWeight: 'bold'
  }
});

class MedicinesNotAllowed extends Component {
  state = {
    open: false,
    loading: false,
    rows: [],
    row: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && nextProps.filter !== '') {
      const { filter } = nextProps;
      const { rows } = this.state;
      let rowsFilter = rows;

      rowsFilter = rows.filter(value => {
        return (
          removeAccents(value.substanciaAtiva.toLowerCase()).indexOf(
            removeAccents(filter.toLowerCase())
          ) !== -1 ||
          (value.categoria &&
            removeAccents(value.categoria.toLowerCase()).indexOf(
              removeAccents(filter.toLowerCase())
            ) !== -1)
        );
      });

      this.setState({
        rows: rowsFilter
      });
    } else {
      this.getMedicinesNotAllowed();
    }
  }

  componentDidMount() {
    this.getMedicinesNotAllowed();
  }

  componentWillUnmount() {
    this.props.clearFilter();
  }

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  getMedicinesNotAllowed = async () => {
    this.setState({ loading: true });

    const rows = await getMedicinesNotAllowed().then(res => res);

    this.setState({ loading: false, rows });
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
                    {row.substanciaAtiva}
                  </TableCell>
                  <TableCell align="left">{row.categoria}</TableCell>
                  <TableCell align="center">
                    {row.nomeComercial.join(', ')}
                  </TableCell>
                  <TableCell align="center">
                    {row.fabricante.join(', ')}
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
          <DialogTitle id="form-dialog-title">
            Medicamento Não Permitido
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.label}>
              Substância Ativa:
              <br />
            </DialogContentText>
            <DialogContentText>{row.substanciaAtiva}</DialogContentText>

            <DialogContentText className={classes.label}>
              Categoria:
              <br />
            </DialogContentText>
            <DialogContentText>{row.categoria}</DialogContentText>

            {row.nomeComercial && row.nomeComercial.length > 0 && (
              <Fragment>
                <DialogContentText className={classes.label}>
                  Nome Comercial:
                  <br />
                </DialogContentText>
                <DialogContentText>
                  {row.nomeComercial.join(', ')}
                </DialogContentText>
              </Fragment>
            )}

            {row.fabricante && row.fabricante.length > 0 && (
              <Fragment>
                <DialogContentText className={classes.label}>
                  Fabricante:
                  <br />
                </DialogContentText>
                <DialogContentText>
                  {row.fabricante.join(', ')}
                </DialogContentText>
              </Fragment>
            )}
          </DialogContent>
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
  filter: PropTypes.string,
  classes: PropTypes.object.isRequired,
  clearFilter: PropTypes.func
};

export default withRoot(withStyles(styles)(MedicinesNotAllowed));
