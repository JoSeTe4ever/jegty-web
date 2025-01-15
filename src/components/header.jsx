import React, { Component } from "react";
import family from "./../assets/img/family.png";
import { ReactComponent as IntroIconSvg } from "./../assets/img/jegty_oval.svg";
import GamePadController from "./shared/mollecules/GamePadController";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landingPageData: {},
      openOnLoad: props.openOnLoad,
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

  componentDidMount() {
    if (this.props.openOnLoad) {
      document.getElementById("modalButton").click();
    }
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
        <div className="">
        <GamePadController></GamePadController>
        </div>

      </header>
    );
  }
}

export default Header;
