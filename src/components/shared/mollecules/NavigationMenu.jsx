import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Icon } from './../atoms/Icon'
import Chip from '@material-ui/core/Chip';

import './Mollecules.scss'

export const NavigationMenu = (props) => {

    const { elems } = props;
    const history = useHistory();

    return (
        <div className="navigation-menu mt-5">
            <ul className="navigationList">
                {elems.map((e, i) => <li className="navigationElemnList" key={i} onClick={() => history.push(`${e.navLocation}`)}>
                    <Chip
                        icon={<Icon icon={e.icon} aria-hidden="true"></Icon>}
                        label={e.navText}
                        clickable
                        color="primary"
                        className="navigationChip"
                    />
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
