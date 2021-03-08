import React from 'react';
import { Avatar } from '../atoms/Avatar';
import Badge from '@material-ui/core/Badge';
import './Mollecules.scss';

export const AvatarBadge = (props) => {

    const { email, name, deletable, acceptable, id, onDelete, onAccept } = props;

    const deleteBadge = (content) => {
        return <Badge onClick={($event) => {
            const toSt = $event.target.outerHTML + "";
            if (toSt.includes("colorError")) {
                $event.stopPropagation(); onDelete(id);
            }
        }} badgeContent={'X'} color="error" className="cursor-pointer"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}>{content}</Badge>;
    }

    const acceptBadge = (content) => {
        return <Badge onClick={($event) => { $event.stopPropagation(); onAccept(id); }} badgeContent={'✔'} color="primary" className="cursor-pointer" anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>{content}</Badge>;
    }

    const avatarContent = <div className="d-flex justify-content-center">
        <div className="avatarContainer">
            <Avatar email={email} customClass="miniAvatar coolEfect"></Avatar>
            <div>
                <span className="avatarName">{name}</span>
                <span className="avatarMail">{email}</span>
            </div>
        </div>
    </div>;

    let toReturn = deletable ? deleteBadge(avatarContent) : avatarContent;
    return acceptable ? acceptBadge(toReturn) : toReturn;

}      
