import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Icon } from './../atoms/Icon'
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

import './Mollecules.scss'

export const NavigationMenu = (props) => {

    const { elems } = props;
    const history = useHistory();

    return (
        <div className="navigation-menu mt-5">
            <ul className="navigationList">
                {elems.map((e, i) => <li className="navigationElemnList" key={i} onClick={() => history.push(`${e.navLocation}`)}>
                    <div className="container">
                        <Icon icon={e.icon} aria-hidden="true"></Icon>
                        <span className="ml-3">{e.navText}</span>
                    </div>
                </li>)}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)
