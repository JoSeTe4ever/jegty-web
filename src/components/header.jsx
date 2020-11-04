import React, { Component } from "react";
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
import { ReactComponent as IntroIconSvg } from './../assets/img/jegty_oval.svg';
import family from './../assets/img/family.png';

import { connect } from "react-redux";
import { showDialog } from "../redux/actions/actions"

export class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      landingPageData: {},
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({ ...this.state, showModal: true });
  }

  handleHide() {
    this.setState({ ...this.state, showModal: false });
  }

  render() {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="">
              <div className="mt-5">
                <div className="intro-text">
                  <p>
                    <IntroIconSvg></IntroIconSvg>
                    <img src={family} alt="Family" className="familyLogo" />
                  </p>
                  <div className="subtitle pb-3">Games for teams</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            data-toggle="modal" data-target="#myModal"
            onClick={() => console.log(true)}
            className="btn btn-custom btn-lg page-scroll mt-5"
          >
            start
                  </button>
        </div>
      </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
};

const mapStateToProps = state => ({
  showLoginModal: state.showLoginModal
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
