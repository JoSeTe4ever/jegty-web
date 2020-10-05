import React from 'react'
import "./Atoms.scss"

export const Avatar = (props) => {
    const { imgSrc, onClickCallback } = props;

    return (
        <img src={`https://www.gravatar.com/avatar/280d4c56f251308af0a02eda2eae2e8b?d=robohash`} alt="Avatar" className="avatar" onClick={onClickCallback}></img>
    )
}
