import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createNewGame, getJegtyUserById } from '../../../data/jegty-api';
import { InputField } from '../../shared/atoms/InputField';
import { SearchInput } from '../../shared/mollecules/SearchInput';
import { addGameidToUserList, cacheJegtyUser, cacheRoomGame } from './../../../redux/actions/actions';
import { AvatarList } from './../../shared/mollecules/AvatarList';

export const CreateGame = () => {

    // jopi meter esto en otro componente. al menos el datepicker.
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [partyFriends, setPartyFriends] = useState([]);
    const [newGameFriends, setNewGameFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState("");

    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    const currentLoggedUser = useSelector((state) => state.user);
    const friendsList = useSelector((state) => state.friends);
    const cachedJegtyUsers = useSelector((state) => state.cache.jegtyUsers);

    const dispatch = useDispatch();

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputDiscord = useRef(null);
    const inputSelectedGame = useRef(null);
    const inputSelectedDate = useRef(new Date());

    const SEARCH_FRIENDS_INPUT_ID = "searchFriends";
    const NAME_INPUT_ID = "nameInput";
    const GAME_DATE_INPUT_ID = "gameDateInput";
    const DESCRIPTION_INPUT_ID = "descriptionInput";
    const DISCORD_INPUT_ID = "discordInput";

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSelectFriend = (e) => {
        if (e && e.target.value != "") {
            setSelectedFriend(e.target.value);
        }
    }

    const addNewGameFriend = () => {
        newGameFriends.push(selectedFriend);
        setNewGameFriends([...newGameFriends]);
    }

    const onDeleteFriend = (friendEmail) => {
        console.log("ondelete" + friendEmail);
    }

    const loadFriendsFromDatabase = (usersIdList) => {
        //read from firestore and cache it.
        const refs = usersIdList.map(e => {
            return getJegtyUserById(e);
        });
        // ahcer un push q.all
        Promise.all(refs).then(friendsList => {
            const list = friendsList.map(e => e.data());
            setPartyFriends(list);
            list.map(e => {
                dispatch(cacheJegtyUser(e));
            })
        });
    }
    useEffect(() => {
        if (friendsList && friendsList.length > 0) {
            const totalLength = friendsList.length;
            const cachedIds = cachedJegtyUsers.map(e => e.id);
            const foundIds = friendsList.some(r => cachedIds.includes(r));
            if (foundIds) {
                const cachedParty = cachedJegtyUsers.filter(r => friendsList.includes(r.id));
                if (totalLength === cachedParty.length) {
                    setPartyFriends(cachedParty);
                } else {
                    loadFriendsFromDatabase(friendsList);
                }
            } else {
                loadFriendsFromDatabase(friendsList);
            }
        } else {
            setPartyFriends([]);
        }
    }, []);

    const sanityCheck = () => {
        const roomName = inputName.current;
        const rawgGameId = inputSelectedGame.current;
        const ownerId = currentLoggedUser.uid;
        const startAt = selectedDate;
        if ((roomName && rawgGameId && ownerId && startAt)) {
            return true;
        }
        return false;
    }

    const createGame = () => {
        setLoading(true);
        if (!sanityCheck()) {
            setSeverity("error");
            setMessage("Error while creating room");
            setOpenSnackbar(true);
            resetForm();
            return;
        }
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
        createNewGame(newGame, currentLoggedUser.uid, newGameFriends).then((id) => {
            //if everything went well we add it to the store. 
            dispatch(addGameidToUserList(id));
            dispatch(cacheRoomGame(newGame));
            setSeverity("success");
            setMessage("Room sucessfully created");
            setOpenSnackbar(true);
        }).catch(error => {
            setSeverity("error");
            setMessage("Error while creating room");
            setOpenSnackbar(true);
        }).finally(() => {
            resetForm();
        });

    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const resetForm = () => {
        if (inputName.current) {
            inputName.current.value = "";
        }

        if (inputDescription.current) {
            inputDescription.current.value = "";
        }


        if (inputDiscord.current) {
            inputDiscord.current.value = "";
        }


        if (inputSelectedGame.current) {
            inputSelectedGame.current.value = "";
        }
    }
    return (
        <React.Fragment>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
            <div className="container d-flex flex-column">
                <InputField id={NAME_INPUT_ID} labelText="Name" variant="outlined" innerRef={inputName} helperText="The name of your room" required></InputField>
                <InputField id={GAME_DATE_INPUT_ID} labelText="Cake date" innerRef={inputSelectedDate}
                    helperText="When the game starts" type="datetime-local"></InputField>

                <SearchInput innerRef={inputSelectedGame}></SearchInput>
                <InputField id={DESCRIPTION_INPUT_ID} labelText="Description" variant="outlined" innerRef={inputDescription} helperText="Some insights" required></InputField>
                <InputField id={DISCORD_INPUT_ID} labelText="DiscordLink" variant="outlined" innerRef={inputDiscord} helperText="Share it with discord" required></InputField>

                <div className="friendsAgregator mt-3 border">
                    <AddIcon onClick={addNewGameFriend} />
                    <InputLabel htmlFor="outlined-age-native-simple">Age2</InputLabel>
                    <Select
                        native
                        value={selectedFriend}
                        onChange={handleSelectFriend}
                        label="Friends"
                        inputProps={{
                            name: 'friends',
                            id: SEARCH_FRIENDS_INPUT_ID,
                        }}
                    >

                        {partyFriends.map((user, index) =>
                            <option key={index} value={user.id}>
                                {user.name}
                            </option>)}
                    </Select>
                    <AvatarList friends={newGameFriends} deletable={true} onDelete={onDeleteFriend}></AvatarList>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {severity !== "success" ? <button
                    data-toggle="modal" data-target="#myModal"
                    onClick={() => createGame()}
                    className="btn btn-custom btn-lg mt-5"
                >
                    Create
                      </button> : null}

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)
