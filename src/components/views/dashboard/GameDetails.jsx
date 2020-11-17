import React, { useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const GameDetails = () => {

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

