import React from 'react';
import { connect, useSelector } from "react-redux";

export const GameDetails = () => {

    const cachedRawGames = useSelector((state) => state.cache.rawGames);
    const cachedRoomGames = useSelector((state) => state.cache.roomGames);
    
    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

