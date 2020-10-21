import React, { useEffect, useState } from 'react';
import { db } from '../../../data/firebase';
import { Avatar } from '../atoms/Avatar';

export const AvatarList = (props) => {

    const { friends } = props;
    const [loadedFriends, setFriends] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadDataFromFirebase = async (userIds) => {
        const refs = userIds.map(id => db.collection('users').doc(`${id}`).get())
        // ahcer un push q.all
        Promise.all(refs).then(users => {
            setFriends(users);
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
        <div>
            {isLoading ? loading : null}
            <ul className="list-unstyled">
                {loadedFriends.map((user, index) => <li className="media" key={index}>
                    <Avatar onClickCallback={() => console.log("clicked")} email={user.email}></Avatar>
                </li>)}
            </ul>


        </div>
    )
}
