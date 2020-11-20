import React from 'react';
import { Avatar } from '../atoms/Avatar';
import Badge from '@material-ui/core/Badge';
import './Mollecules.scss';

export const AvatarBadge = (props) => {

    const { email, name, deletable } = props;
    const avatarContent = <div className="d-flex justify-content-center">
        <div className="avatarContainer">
            <Avatar email={email} customClass="miniAvatar coolEfect"></Avatar>
            <div>
                <span className="avatarName">{name}</span>
                <span className="avatarMail">{email}</span>
            </div>
        </div>
    </div>;
    const toReturn = deletable ? <Badge badgeContent={'X'} color="error" className="cursor-pointer">
        {avatarContent}
    </Badge> : avatarContent
    return toReturn;
}      
