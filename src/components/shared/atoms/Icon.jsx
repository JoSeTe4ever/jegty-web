import React from 'react'

import "./Atoms.scss";

export const Icon = (props) => {
    const { icon, onClickCallback } = props;
    return (
        <i className={`fa fa-${icon} fa-2x`} aria-hidden="true" onClick={onClickCallback}></i>
    )
}
