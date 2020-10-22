import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';


export const GameCard = (props) => {
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
        <Card className="gameCard">
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
                image="/static/images/cards/live-from-space.jpg"
                title="Live from space album cover"
            />
        </Card>
    )
}
