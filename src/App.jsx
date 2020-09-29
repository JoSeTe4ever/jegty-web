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
import { showDialog } from "./redux/actions/actions"
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
    const { setShowDialog , showLoginModal} = this.props;
    debugger;
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
        <span onClick={ () => setShowDialog(true)}>{showLoginModal.toString()}CACACACA</span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return { setShowDialog: (isShown) => dispatch(showDialog(isShown)) }
};

const mapStateToProps = state => ({
  showLoginModal: state.showLoginModal
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
