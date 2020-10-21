import React from 'react';
import { Avatar } from '../atoms/Avatar';
export const AvatarBadge = (props) => {

    const {email, name} = props;
    return (
        <div className="d-flex justify-content-center">
            <div className="avatarContainer">
                <Avatar email={email} customClass="miniAvatar"></Avatar>
                <div>
                    <span className="avatarName">{name}</span>
                    <span className="avatarMail">{email}</span>
                </div>
            </div>
        </div>
    )
}