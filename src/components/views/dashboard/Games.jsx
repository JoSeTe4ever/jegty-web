import React from 'react';
import { useSelector } from 'react-redux';
import { GameCard } from './../../shared/mollecules/Card';

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