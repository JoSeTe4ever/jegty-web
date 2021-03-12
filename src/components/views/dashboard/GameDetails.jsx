import { getDateFromSeconds } from 'helpers/dates';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { cacheJegtyUser } from 'redux/actions/actions';
import { getCachedUserById } from 'redux/selectors/selectors';
import { getJegtyUserById, getParticipantsIdFromRoomId } from "../../../data/jegty-api";
import { AvatarList } from './../../shared/mollecules/AvatarList';
import './../../views/views.scss';

export const GameDetails = (props) => {

    const { id, jegtyGame, rawGame } = props.location.state; //jegtyGame.ownerId
    const [participantList, setParticipantList] = useState([]);
    const [ownerUser, setOwnerUser] = useState({});
    const dispatch = useDispatch();
    const cachedOwnerUser = useSelector(getCachedUserById(jegtyGame.ownerId));
    const gameDate = getDateFromSeconds(jegtyGame.startAt.seconds);

    useEffect(() => {
        if (!cachedOwnerUser) {
            getJegtyUserById(jegtyGame.ownerId).then(user => {
                user = { ...user.data() };
                dispatch(cacheJegtyUser(user));
                setOwnerUser(user);
            })
        } else {
            setOwnerUser(cachedOwnerUser);
        }

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
                Organizer: {ownerUser.name}
            </div>
            <div className="date">
                Date: {gameDate.toDateString()}
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
