import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import Features from './components/features';
import About from './components/about';
import Services from './components/services';
import Gallery from './components/gallery';
import Testimonials from './components/testimonials';
import Team from './components/Team';
import { Login } from './components/Login';
import Contact from './components/contact';
import JsonData from './data/data.json';
import { connect } from "react-redux";
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
  getlandingPageData() {
    this.setState({ ...this.state, landingPageData: JsonData })
  }

  componentDidMount() {
    this.getlandingPageData();
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
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
        <Services data={this.state.landingPageData.Services} />
        <Gallery />
        <Testimonials data={this.state.landingPageData.Testimonials} />
        <Team data={this.state.landingPageData.Team} />
        <Contact data={this.state.landingPageData.Contact} />
        <div id="modal-root"></div>
      </div>
    ) : <Dashboard></Dashboard>
  }
}

const mapStateToProps = state => ({
  isLogged: state.isLogged,
});

export default connect(mapStateToProps, null)(App);

