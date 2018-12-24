import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from './withRoot';

import { DrugsNotAllowed, DrugsAllowed } from './components/MedicationProvider';

const SearchContext = React.createContext({
  filter: null,
  onFilter: filter => {},
  clearFilter: () => {}
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuNavigation: {
    position: 'fixed',
    width: '100%',
    bottom: 0
  }
});

class App extends Component {
  state = {
    filter: null,
    valueNavigationMenu: 0
  };

  onFilter = filter => this.setState({ filter });

  clearFilter = () => this.setState({ filter: null });

  handleChange = (event, value) =>
    this.setState({ valueNavigationMenu: value });

  render() {
    const { onFilter, clearFilter } = this;
    const { classes } = this.props;
    const { valueNavigationMenu } = this.state;

    const value = {
      ...this.state,
      onFilter,
      clearFilter
    };

    return (
      <SearchContext.Provider value={value}>
        <SearchContext.Consumer>
          {({ onFilter, clearFilter, filter }) => (
            <div className={classes.root}>
              <AppBar position="fixed" color="primary">
                <Toolbar>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                  >
                    G6PD
                  </Typography>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>

              <DrugsNotAllowed {...{ clearFilter, filter }} />
              <DrugsAllowed {...{ clearFilter, filter }} />

              <BottomNavigation
                value={valueNavigationMenu}
                onChange={this.handleChange}
                showLabels
                className={classes.menuNavigation}
              >
                <BottomNavigationAction
                  label="Não Permitidos"
                  icon={<HighlightOffIcon />}
                />
                <BottomNavigationAction
                  label="Permitidos"
                  icon={<CheckCircleOutlineIcon />}
                />
              </BottomNavigation>
            </div>
          )}
        </SearchContext.Consumer>
      </SearchContext.Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
