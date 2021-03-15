import React from 'react'
import { GameCard } from './../../shared/mollecules/Card'
import { connect, useSelector } from 'react-redux';

export const Games = props => {

    const userGames = useSelector((state) => {
        return state.userGames
    });

    return (
        <div>
            <div className="list-unstyled">
                {userGames.map((e, index) =>
                    <GameCard gameId={e} key={index}></GameCard>
                )}
            </div>
        </div>
    )
}