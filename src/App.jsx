import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import Header from './components/header';
import { Invite } from './components/Invite';
import { Login } from './components/Login';
import { Dashboard } from './components/views/Dashboard';

export class App extends Component {

  state = {
    landingPageData: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      landingPageData: {},
      isLogged: false,
      loading: false
    };
  }

  // remove backdrop from modal if exists.
  render() {
    const modalBackgroundArray = document.getElementsByClassName("modal-backdrop fade show")
    if (modalBackgroundArray && modalBackgroundArray.length > 0) {
      modalBackgroundArray[0].remove();
    }

    const { isLogged } = this.props;
    return !isLogged ? (
      <div>
        <Switch>
          <Route>
            <Login></Login>
            <Header data={this.state.landingPageData.Header} />
          </Route>
          <Route path="/invite">
            <Invite></Invite>
            <Header data={this.state.landingPageData.Header} openOnLoad="true" />
          </Route>
        </Switch>
        <div id="modal-root"></div>
      </div>
    ) :
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dashboard></Dashboard>
      </MuiPickersUtilsProvider>
  }
}

const mapStateToProps = state => ({
  isLogged: state.isLogged,
});

export default connect(mapStateToProps, null)(App);

