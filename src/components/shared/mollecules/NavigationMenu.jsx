import { Badge } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import React from 'react';
import { useHistory } from 'react-router';
import { Icon } from './../atoms/Icon';
import './Mollecules.scss';


export const NavigationMenu = (props) => {

    const { elems } = props;
    const history = useHistory();
    const warningBadge = content => <Badge badgeContent={'!'} color="error" className="cursor-pointer">{content}</Badge>;
    const content = e => <Chip
        icon={<Icon icon={e.icon} aria-hidden="true"></Icon>}
        label={e.navText}
        clickable
        color="primary"
        className="navigationChip"
    />;
    return (
        <div className="navigation-menu mt-5">
            <ul className="navigationList">
                {elems.map((e, i) => <li className="navigationElemnList" key={i} onClick={() => history.push(`${e.navLocation}`)}>
                    {e.isPending ? warningBadge(content(e)) : content(e)}
                </li>)}
            </ul>
        </div>
    )
}