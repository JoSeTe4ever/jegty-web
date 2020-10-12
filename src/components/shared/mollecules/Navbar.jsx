import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ReactComponent as IconSvg } from '../../../assets/icons/icono.svg';
import { Avatar } from "./../atoms/Avatar";
import { db } from './../../../data/firebase';
import { addJegtyUser } from "./../../../redux/actions/actions";
import './Mollecules.scss';

export const Navbar = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const jegtyUser = useSelector((state) => state.jegtyUser);

    useEffect(function () {
        if (user !== undefined && user.uid !== undefined && jegtyUser.id === undefined) {
            db.collection('users').doc(user.uid).get().then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                console.log(`ERROR ${error}`, "ERROR");
            });
        }
    }, [])


    return (
        <nav className="navbar navbar-light py-1">
            <a className="navbar-brand pl-4" href="#">
                <div className="brand-container">
                    <IconSvg></IconSvg>
                    <span className="brand-span-container pl-3">Jegty</span>
                </div>
            </a>

            <Avatar onClickCallback={() => history.push('profile')} email={user.email}></Avatar>
        </nav>
    )
}