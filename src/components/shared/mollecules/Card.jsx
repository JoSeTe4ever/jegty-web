import React, { useState, useRef } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


export const GameCard = (props) => {
    const [mouseEntered, setMouseEntered] = useState(false);

    const dummyInfoObject = {
        createdAt: '',
        description: '',
        discordChannel: '',
        id: '',
        owner: '',
        roomName: '',
        startAt: '',
    }
    return (
        <React.Fragment>
            <Card className="gameCard"
                onMouseEnter={() => {
                    setMouseEntered(!mouseEntered)
                }}
                onMouseLeave={() => {
                    setMouseEntered(!mouseEntered)
                }}
            >
                <div className="details">
                    <CardContent className="gameContent">
                        
                        <Typography component="h5" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className="gameCover"
                    image="https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg"
                    title="Live from space album cover"
                />
            </Card >
            {mouseEntered ? <div>CACACACACACACA</div> : null}
        </React.Fragment>
    )
}
