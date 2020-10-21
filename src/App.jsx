import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from './components/header';
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
        <Login></Login>
        <Header data={this.state.landingPageData.Header}/>
        <div id="modal-root"></div>
      </div>
    ) : <Dashboard></Dashboard>
  }
}

const mapStateToProps = state => ({
  isLogged: state.isLogged,
});

export default connect(mapStateToProps, null)(App);

