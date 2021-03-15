import React from 'react';
import { AvatarList } from './../../shared/mollecules/AvatarList';

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