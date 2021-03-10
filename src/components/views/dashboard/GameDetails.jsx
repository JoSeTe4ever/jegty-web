import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import './../../views/views.scss';
import { getParticipantsIdFromRoomId } from "../../../data/jegty-api";
import { AvatarList } from './../../shared/mollecules/AvatarList';

export const GameDetails = (props) => {

    const { id, jegtyGame, rawGame } = props.location.state;
    const [participantList, setParticipantList] = useState([]);

    useEffect(() => {
        getParticipantsIdFromRoomId(id).then(participantList => {
            participantList = participantList.docs.map(doc => {
               return doc.data().id;
            });
            setParticipantList(participantList);
        })
    }, []);

    

    return (
        <div>
            <div className="headerImage d-flex justify-content-center">
                <img className="mainImage" src={rawGame.background_image_additional}></img>
            </div>
            <div className="organizer">
                Organizer:
            </div>
            <div className="date">
                Date:
            </div>
            <div className="social">
                Social:
            </div>
            <h3 className="gameTitle">
                Game: {rawGame.name}
            </h3>
            <div dangerouslySetInnerHTML={{ __html: rawGame.description }}></div>
            <div className="rawgioRecognition">
                Powered by <span>rawg.io</span>
            </div>

            <AvatarList friends={participantList}></AvatarList>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

