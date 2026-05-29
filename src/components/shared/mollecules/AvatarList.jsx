import React, { useEffect, useState } from 'react';
import { getJegtyUserById } from '../../../data/jegty-api';
import { AvatarBadge } from './AvatarBadge';
import { cacheJegtyUser } from './../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import './Mollecules.scss';

/**
 * It loads user data from the backend, from 
 * the id list that is passed at props. 
 * It caches in the store any data saved 
 * 
 * @param {*} props 
 * 
 * friends -> id list
 * deletable -> show an X badge and uses onDelete as callback
 * accepteble -> show a ✔ badge and uses on Accept as callback
 * onAccept -> callback when accepting
 * onDelete ->  callback when deleting
 * 
 */
export const AvatarList = (props) => {

    const { friends, deletable, acceptable, onDelete, onAccept } = props;
    const [loadedFriends, setFriends] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const friendsList = useSelector((state) => state.friends);
    const cachedJegtyUsers = useSelector((state) => state.cache.jegtyUsers);

    // todo save readings checking cache
    const loadDataFromPocketBase = async (userIds) => {
        setLoading(true);
        const refs = userIds.map(id => getJegtyUserById(`${id}`))
        
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
                }
            }
        }
        if (friends && friends.length > 0) {
            loadDataFromPocketBase(friends);
        }

        else {
            setFriends([]);
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
        <div>
            {isLoading ? loading : null}
            <ul className="list-unstyled d-flex flex-row flex-wrap justify-content-center">
                {loadedFriends.map((user, index) => <li className="avatarItem media mr-2" key={index}>
                    <AvatarBadge id={user.id} email={user.email} name={user.name} deletable={deletable} acceptable={acceptable}
                    onDelete={onDelete} 
                    onAccept={onAccept}
                    ></AvatarBadge>
                </li>)}
            </ul>
        </div>
    )
}
