import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Avatar } from './../atoms/Avatar'
import { getJegtyUserById } from './../../../data/jegty-api'

export const GameCard = (props) => {
    const [mouseEntered, setMouseEntered] = useState(false);
    //const {game} = props;

    const game = {
        createdAt: '19 de octubre de 2020, 9:04:00 UTC+2',
        description: 'this is a room description',
        discordChannel: 'https://discord.gg/8UprGpN',
        id: '5j7LTjfXdDpBfjOtm5yT',
        rawGameId: '',
        owner: 'IMqzLJkOfzeeb3D3LeVSSBxnSJC2',
        roomName: "Rick's Room",
        startAt: '29 de octubre de 2020, 21:00:00 UTC+1',
        img: 'https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg'
    }

    const MiniAvatarList = (props) => {
        return (<ul className="miniAvatarList">
            <li><Avatar></Avatar></li>
            <li><Avatar></Avatar></li>
            <li><Avatar></Avatar></li>
            <li><Avatar></Avatar></li>
        </ul>)
    }

    return (
        <React.Fragment>

            <Card className="gameCard mb-3"
                onMouseEnter={() => {
                    setMouseEntered(!mouseEntered)
                }}
                onMouseLeave={() => {
                    setMouseEntered(!mouseEntered)
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
                            Organizer: {'getJegtyUserById(game.owner)'}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                        </Typography>
                    </CardContent>
                </div>

            </Card >
            {mouseEntered ? <MiniAvatarList></MiniAvatarList> : null}
        </React.Fragment>
    )
}
