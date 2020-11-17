import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from './../atoms/Avatar';
import { getJegtyUserById, getGameById } from "./../../../data/jegty-api"
import { getRawGameById } from "./../../../data/games-api"
import { cacheRawGame, cacheRoomGame } from "./../../../redux/actions/actions"
import { useHistory } from 'react-router'

export const GameCard = (props) => {
    const { gameId } = props;
    const [isSelected, setIsSelected] = useState(false);
    const [jegtyGame, setJegtyGame] = useState({});
    const [rawGame, setRawGame] = useState({});
    const currentJegtyuser = useSelector((state) => state.user);
    const cachedRawGames = useSelector((state) => state.cache.rawGames);
    const cachedRoomGames = useSelector((state) => state.cache.roomGames);
    const [gameJegtyUser, setGameJegtyUser] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const _displayAndCatchRawGame = (cachedArray, elem) => {
        if (cachedArray.some(e => e.id === elem.rawgGameId)) {
            setRawGame(cachedArray.find(e => e.id === elem.rawgGameId))
        } else if (elem && elem.rawgGameId) {
            getRawGameById(elem.rawgGameId).then(rawGame => {
                setRawGame(rawGame)
                dispatch(cacheRawGame(rawGame));
            })
        }
    };

    const _loadUserInfo = (ownerId) => {
        if (currentJegtyuser.uid !== ownerId) {
            getJegtyUserById(ownerId).then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                setGameJegtyUser(jegtyUser)
            });
        } else {
            setGameJegtyUser(currentJegtyuser)
        }
    };

    useEffect(() => {
        // if cached, displayit. If not cached,  display it & cache it
        let room = {};
        if (cachedRoomGames.some(room => room.id === gameId)) {
            room = cachedRoomGames.find(room => room.id === gameId);
            setJegtyGame(room);
            _displayAndCatchRawGame(cachedRawGames, room);
            _loadUserInfo(room.ownerId);
        } else {
            getGameById(gameId).then((game) => {
                room = { ...game.data() };
                setJegtyGame(room);
                dispatch(cacheRoomGame(room));
                _displayAndCatchRawGame(cachedRawGames, room);
                _loadUserInfo(room.ownerId);
            });
        }

    }, [])

    const MiniAvatarList = (props) => {
        return (<ul className="miniAvatarList">
            <li>
                <span>Add friends</span>
            </li>
            <li className="ml-3 mb-3"><Avatar customClass="smallAvatar"></Avatar><span className="ml-3">Friend1</span></li>
            <li className="ml-3 mb-3"><Avatar customClass="smallAvatar"></Avatar><span className="ml-3">Friend1</span></li>
            <li className="ml-3 mb-3"><Avatar customClass="smallAvatar"></Avatar><span className="ml-3">Friend1</span></li>
            <li className="ml-3 mb-3"><Avatar customClass="smallAvatar"></Avatar><span className="ml-3">Friend1</span></li>
        </ul>)
    }

    return (
        <React.Fragment>
            <Card className="gameCard mb-3"
                onClick={() => {
                    console.log("navigate to details!!!!! ");
                    history.push("/game-details", { id: gameId, jegtyGame: jegtyGame, rawGame: rawGame })
                }}
            >
                <CardMedia
                    className="gameCover"
                    image={rawGame.background_image}
                    title="Live from space album cover"
                />
                <div className="details">
                    <CardContent className="gameContent">

                        <Typography component="h5" variant="h5">
                            Organizer:
                        </Typography>
                        <span className="creationDate"></span>
                        <div className="socialContainer">
                            <div>discord</div>
                            <div>twitch</div>

                        </div>
                        <Typography variant="subtitle1" color="textSecondary">
                            {gameJegtyUser.name}
                        </Typography>

                        <div className="descriptionContainer">
                            <div dangerouslySetInnerHTML={{ __html: rawGame.description }}></div>
                        </div>
                    </CardContent>

                </div>
                <Fab color="primary" aria-label="add" onClick={() => {
                    setIsSelected(!isSelected);
                }}>
                    <AddIcon />
                </Fab>
                {isSelected ? <MiniAvatarList></MiniAvatarList> : null}
            </Card>
        </React.Fragment>
    )
}
