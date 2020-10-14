import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { Icon } from './../atoms/Icon'

export const NavigationMenu = (props) => {

    const { elems } = props;
    const history = useHistory();

    return (
        <div className="navigation-menu">
            <ul className="navigationList">
                {elems.map((e, i) => <li className="navigationElemnList" key={i}>
                    <Icon icon={e.icon} aria-hidden="true" onClickCallback={() => history.push(`${e.navLocation}`)}></Icon>
                    <span>{e.navText}</span>
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
