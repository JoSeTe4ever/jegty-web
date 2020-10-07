import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as IconSvg } from '../../../assets/icons/icono.svg';
import { Icon } from "./../atoms/Icon";
import { logValidUser } from './../../../redux/actions/actions'
import { Avatar } from "./../atoms/Avatar";
import { useHistory } from "react-router-dom";

import './Mollecules.scss';

export const Navbar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    const _logout = () => {
        localStorage.clear();
        dispatch(logValidUser(false));
    }

    return (
        <nav className="navbar navbar-light py-1">
            <a className="navbar-brand pl-4" href="#">
                <div className="brand-container">
                    <IconSvg></IconSvg>
                    <span className="brand-span-container pl-3">Jegty</span>
                </div>
            </a>

            <div className="iconsContainer">
                <Icon icon="users" aria-hidden="true" onClickCallback={() => history.push('friends')}></Icon>
                <Icon icon="sign-out" aria-hidden="true" onClickCallback={() => _logout()}></Icon>
            </div>
            <Avatar onClickCallback={() => history.push('profile')} email={user.email}></Avatar>
        </nav>
    )
}