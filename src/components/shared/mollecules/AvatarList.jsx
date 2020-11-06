import React, { useEffect, useState } from 'react';
import { db } from '../../../data/firebase';
import { AvatarBadge } from './AvatarBadge';

/**
 * It loads the data from firebase, from 
 * the id. 
 * 
 * @param {*} props 
 */
export const AvatarList = (props) => {

    const { friends } = props;
    const [loadedFriends, setFriends] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadDataFromFirebase = async (userIds) => {
        const refs = userIds.map(id => db.collection('users').doc(`${id}`).get())
        // ahcer un push q.all
        Promise.all(refs).then(users => {
            setFriends(users.map(e => e.data()));
            setLoading(false);
        })
    }

    useEffect(function () {
        if (friends) {
            loadDataFromFirebase(friends)
        }
    }, [])

    const loading = (<div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>);
    return (
        <div className="">
            {isLoading ? loading : null}
            <ul className="list-unstyled d-flex">
                {loadedFriends.map((user, index) => <li className="media mr-2" key={index}>
                    <AvatarBadge email={user.email} name={user.name}></AvatarBadge>
                </li>)}
            </ul>
        </div>
    )
}
