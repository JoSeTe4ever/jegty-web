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
import { cacheRawGame } from "./../../../redux/actions/actions"

export const GameCard = (props) => {
    const { gameId } = props;
    const [isSelected, setIsSelected] = useState(false);
    const [jegtyGame, setJegtyGame] = useState({});
    const [rawGame, setRawGame] = useState({});
    const currentJegtyuser = useSelector((state) => state.user);
    const cachedRawGames = useSelector((state) => state.cache.rawGames);
    const [gameJegtyUser, setGameJegtyUser] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {
        getGameById(gameId).then((game) => {
            game = { ...game.data() };
            setJegtyGame(game);

            if(cachedRawGames.some(e => e.id === game.rawgGameId)){
                setRawGame(cachedRawGames.find(e => e.id === game.rawgGameId))
            } else {
                getRawGameById(game.rawgGameId).then(rawGame => {
                    setRawGame(rawGame)
                    dispatch(cacheRawGame(rawGame));
                })
            }

            if (currentJegtyuser.uid !== game.ownerId) {
                getJegtyUserById(game.ownerId).then(jegtyUser => {
                    jegtyUser = { ...jegtyUser.data() };
                    setGameJegtyUser(jegtyUser)
                });
            } else {
                setGameJegtyUser(currentJegtyuser)
            }
        });
    }, [])

    const MiniAvatarList = (props) => {
        return (<ul className="miniAvatarList">
            <li>
                <Fab color="primary" aria-label="add" >
                    <AddIcon />
                </Fab>
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
                    setIsSelected(!isSelected)
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
                {isSelected ? <MiniAvatarList></MiniAvatarList> : null}
            </Card>
        </React.Fragment>
    )
}
