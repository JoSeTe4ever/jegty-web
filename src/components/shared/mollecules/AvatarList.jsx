import React, { useEffect, useState } from 'react';
import { db } from '../../../data/firebase';
import { AvatarBadge } from './AvatarBadge';
import { cacheJegtyUser } from './../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';

/**
 * It loads the data from firebase, from 
 * the id list that is passed at props. 
 * It caches in the store any data saved 
 * 
 * @param {*} props 
 */
export const AvatarList = (props) => {

    const { friends, deletable } = props;
    const [loadedFriends, setFriends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const friendsList = useSelector((state) => state.friends);
    const cachedJegtyUsers = useSelector((state) => state.cache.jegtyUsers);

    // todo save readings checking cache
    const loadDataFromFirebase = async (userIds) => {
        setLoading(true);
        const refs = userIds.map(id => db.collection('users').doc(`${id}`).get())
        // ahcer un push q.all
        Promise.all(refs).then(friendsList => {
            const list = friendsList.map(e => e.data());
            setFriends(list);
            list.map(e => {
                dispatch(cacheJegtyUser(e));
            })
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        })
    }

    const renewFriends = () => {
        if (friends && friends.length > 0) {
            const totalLength = friends.length;
            const cachedIds = cachedJegtyUsers.map(e => e.id);
            const foundIds = friendsList.some(r => cachedIds.includes(r));
            if (foundIds) {
                const cachedParty = cachedJegtyUsers.filter(r => friendsList.includes(r.id));
                if (totalLength === cachedParty.length) {
                    setFriends(cachedParty);
                } else {
                    loadDataFromFirebase(friends);
                }
            }
        }

        if (friends && friends.length > 0) {
            loadDataFromFirebase(friends);
        }
    }
    // todo save readings checking cache

    useEffect(() => {
        renewFriends();
    }, [friends]);

    const loading = (<div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
    </div>);
    return (
        <div className="d-flex flex-column">
            {isLoading ? loading : null}
            <ul className="list-unstyled">
                {loadedFriends.map((user, index) => <li className="media mr-2" key={index}>
                    <AvatarBadge email={user.email} name={user.name} deletable={deletable}></AvatarBadge>
                </li>)}
            </ul>
        </div>
    )
}
