import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AvatarList } from './../../shared/mollecules/AvatarList';
import { addFriendidToFriendList, removeFriendRequest } from '../../../redux/actions/actions';
import { removePendingFriendRequest, acceptPendingFriendRequest } from '../../../data/jegty-api';

export const PendingRequests = props => {



    return (
        <div>
            <h3>pending requests</h3>
            <AvatarList friends={requestsIds}
                onAccept={acceptFriend}
                onDelete={rejectFriend}
                acceptable={true} deletable={true}></AvatarList>
        </div>
    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequests)