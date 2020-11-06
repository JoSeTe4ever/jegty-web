import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createNewGame } from '../../../data/jegty-api';
import { InputField } from '../../shared/atoms/InputField';
import { SearchInput } from '../../shared/mollecules/SearchInput';
import { addGameidToUserList, cacheRoomGame } from "./../../../redux/actions/actions";
import { AvatarList } from './../../shared/mollecules/AvatarList';

export const CreateGame = () => {

    // jopi meter esto en otro componente. al menos el datepicker.
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
    const [partyFriends, setPartyFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    const currentLoggedUser = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputDiscord = useRef(null);
    const inputSelectedGame = useRef(null);

    const SEARCH_FRIENDS_INPUT_ID = "searchFriends";
    const NAME_INPUT_ID = "nameInput";
    const GAME_DATE_INPUT_ID = "gameDateInput";
    const DESCRIPTION_INPUT_ID = "descriptionInput";
    const DISCORD_INPUT_ID = "discordInput";

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSelectFriend = (e) => {
        console.log("e" + e);
    }

    const createGame = () => {
        setLoading(true);
        const roomName = inputName.current.value;
        const description = inputDescription.current.value;
        const discord = inputDiscord.current.value;
        const rawgGameId = inputSelectedGame.current.id;
        const ownerId = currentLoggedUser.uid;
        const startAt = selectedDate;
        const createdAt = new Date();
        const newGame = {
            description,
            discord,
            ownerId,
            rawgGameId,
            roomName,
            startAt,
            createdAt,
            twitch: "cc",
        }
        createNewGame(newGame, currentLoggedUser.uid).then((id) => {
            //if everything went well we add it to the store. 
            dispatch(addGameidToUserList(id));
            dispatch(cacheRoomGame(newGame));
        });

    };

    return (
        <React.Fragment>
            <div className="container d-flex flex-column">
                <InputField id={NAME_INPUT_ID} labelText="Name" variant="outlined" innerRef={inputName} helperText="The name of your room" required></InputField>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id={GAME_DATE_INPUT_ID}
                        label="Date picker inline"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <SearchInput innerRef={inputSelectedGame}></SearchInput>
                <InputField id={DESCRIPTION_INPUT_ID} labelText="Description" variant="outlined" innerRef={inputDescription} helperText="Some insights" required></InputField>
                <InputField id={DISCORD_INPUT_ID} labelText="DiscordLink" variant="outlined" innerRef={inputDiscord} helperText="Share it with discord" required></InputField>

                <div className="friendsAgregator mt-3 border">
                    <Fab color="primary" aria-label="add" className="m-1">
                        <AddIcon />
                    </Fab>
                    <InputField id={SEARCH_FRIENDS_INPUT_ID} labelText="Search" variant="outlined" className="m-1"></InputField>
                    <AvatarList friends={partyFriends} onSelect={handleSelectFriend}></AvatarList>
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <button
                    data-toggle="modal" data-target="#myModal"
                    onClick={() => createGame()}
                    className="btn btn-custom btn-lg mt-5"
                >
                    Create
                      </button>
            </div>
        </React.Fragment>
    )
}

CreateGame.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
