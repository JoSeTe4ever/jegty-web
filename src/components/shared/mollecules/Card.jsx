import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from './../atoms/Avatar';
import { getJegtyUserById } from "./../../../data/jegty-api"

export const GameCard = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    const currentJegtyuser = useSelector((state) => state.user);
    const [gameJegtyUser, setGameJegtyUser]  = useState({});

    const game = {
        createdAt: '19 de octubre de 2020, 9:04:00 UTC+2',
        description: 'this is a room description',
        discordChannel: 'https://discord.gg/8UprGpN',
        id: 'LjfWj2pER8Xj1eODNWRrnFztgL5222',
        rawGameId: '',
        owner: 'LjfWj2pER8Xj1eODNWRrnFztgL52',
        roomName: "Rick's Room",
        startAt: '29 de octubre de 2020, 21:00:00 UTC+1',
        img: 'https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg'
    }

    useEffect(() => {
        if (currentJegtyuser.uid !== game.owner) {
             getJegtyUserById(game.owner).then(value => {
                setGameJegtyUser(value)
            });
        } else {
            setGameJegtyUser(currentJegtyuser)
        }
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
                    image={game.img}
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

                        <div>

                        </div>
                    </CardContent>
                </div>
                {isSelected ? <MiniAvatarList></MiniAvatarList> : null}
            </Card>
        </React.Fragment>
    )
}
