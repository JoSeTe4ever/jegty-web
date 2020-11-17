import React from 'react';
import { connect } from "react-redux";
import './../../views/views.scss';

export const GameDetails = (props) => {

    const { id, jegtyGame, rawGame } = props.location.state;
    return (
        <div>
            <div className="headerImage d-flex justify-content-center">
                <img className="mainImage" src={rawGame.background_image_additional}></img>
            </div>
            <div className="organizer">
                Organizer:
            </div>
            <div className="date">
                Organizer:
            </div>
            <div className="social">
                Organizer:
            </div>
            <h3 className="gameTitle">
                Game: {rawGame.name}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: rawGame.description }}></div>
            <div className="rawgioRecognition">
                Powered by <span>rawg.io</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

