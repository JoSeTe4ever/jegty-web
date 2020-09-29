import React, { Component } from 'react'
import Navigation from './components/navigation';
import Header from './components/header';
import Features from './components/features';
import About from './components/about';
import Services from './components/services';
import Gallery from './components/gallery';
import Testimonials from './components/testimonials';
import Team from './components/Team';
import Contact from './components/contact';
import JsonData from './data/data.json';
import { connect } from "react-redux";

export class App extends Component {
  state = {
    landingPageData: {},
    showModal: false
  }

  constructor(props) {
    super(props);
    this.state = {
      landingPageData: {},
      showModal: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }
  getlandingPageData() {
    this.setState({ landingPageData: JsonData, showModal: false })
  }

  componentDidMount() {
    this.getlandingPageData();
  }

  handleShow() {
    this.setState({ ...this.state, showModal: true });
  }

  handleHide() {
    this.setState({ ...this.state, showModal: false });
  }

  render() {
    return (
      <div>
        <Navigation />
        <Header data={this.state.landingPageData.Header} />
        <Features data={this.state.landingPageData.Features} />
        <About data={this.state.landingPageData.About} />
        <Services data={this.state.landingPageData.Services} />
        <Gallery />
        <Testimonials data={this.state.landingPageData.Testimonials} />
        <Team data={this.state.landingPageData.Team} />
        <Contact data={this.state.landingPageData.Contact} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showLoginModal: state.showModal
});

export default connect(mapStateToProps)(App);
