import React from 'react'
import "./Atoms.scss"
import md5 from 'md5';

export const Avatar = (props) => {
    const { email, onClickCallback, customClass } = props;

    const hashEmail = (mail) => {
        if(mail !== undefined){
            return md5(mail);
        }
    }
    return (
        <img src={`https://www.gravatar.com/avatar/${hashEmail(email)}?d=robohash`} alt="Avatar" className={`avatar ${customClass}`} onClick={onClickCallback}></img>
    )
}
