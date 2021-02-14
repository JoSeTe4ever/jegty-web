import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AvatarList } from './../../shared/mollecules/AvatarList';
import { addFriendidToFriendList, removeFriendRequest } from '../../../redux/actions/actions';
import { removePendingFriendRequest, acceptPendingFriendRequest } from '../../../data/jegty-api';

export const PendingRequests = props => {

    const dispatch = useDispatch();

    const storePendingRequest = useSelector((state) => state.pendingRequests);
    const cachedJegtyUsers = useSelector((state) => state.cache.jegtyUsers);
    const currentUser = useSelector((state) => state.user);
    const [requestsIds, setFriendsReqList] = useState(storePendingRequest);

    const acceptFriend = ($event, requestId) => {
        debugger;
        dispatch(addFriendidToFriendList(requestId))
        setFriendsReqList([...requestsIds, requestId]);
        acceptPendingFriendRequest(currentUser.email, requestId, currentUser.uid);
        $event.stopPropagation();
    };

    const rejectFriend = ($event, requestId) => {
        debugger;
        dispatch(removeFriendRequest(requestId))
        setFriendsReqList([...requestsIds].filter(e => e != requestId));
        removePendingFriendRequest(currentUser.email, requestId);
        $event.stopPropagation();
    };

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