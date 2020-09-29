import React, { Component } from "react";
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
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
    const { setShowDialog } = this.props;
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {this.props.data ? this.props.data.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>
                    {this.props.data ? this.props.data.paragraph : "Loading"}
                  </p>
                  <IconSvg></IconSvg>
                  <div className="subtitle pb-3">Games for teams</div>
                  <button
                    onClick={() => setShowDialog(true)}
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    start
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return { setShowDialog: (isShown) => dispatch(showDialog(isShown)) }
};

const mapStateToProps = state => ({
  showLoginModal: state.showLoginModal
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
