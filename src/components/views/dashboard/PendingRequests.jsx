import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { AvatarList } from './../../shared/mollecules/AvatarList';
import { addFriendidToFriendList } from '../../../redux/actions/actions';

export const PendingRequests = props => {

    const dispatch = useDispatch();
    const [pendingRequests, setPendingRequests] = useState([]);

    const storePendingRequest = useSelector((state) => state.pendingRequests);
    const cachedJegtyUsers = useSelector((state) => state.cache.jegtyUsers);

    const acceptFriend = (requestId) => {
        dispatch(addFriendidToFriendList(requestId))
        setPendingRequests([...pendingRequests, requestId]);
    };

    const rejectFriend = (requestId) => {

    };

    return (
        <div>
            <h3>pending requests</h3>
            <AvatarList friends={storePendingRequest}
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