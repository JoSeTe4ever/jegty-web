import React, { useState } from 'react'
import { InputField } from './../../shared/atoms/InputField'
import { connect, useSelector } from "react-redux";
import { Avatar } from "./../../shared/atoms/Avatar";
import { getDateFromFirebaseString } from "./../../../helpers/dates";
import { app } from './../../../data/firebase';

export const Profile = (props) => {

    const NICKNAME_INPUT_ID = "nickname";
    const CAKEDATE_INPUT_ID = "cakedate";

    const user = useSelector((state) => state.user);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const updateUser = async () => {
        debugger;
        app.auth().currentUser.updateProfile({
            displayName: 'jopimer',
        }).then(function (userRecord) {
            setInfo(`Successfully updated user ${userRecord ? userRecord.toJSON() : ''}`);
        }).catch(function (error) {
            setError(`Error updating user: ${error}`);
        });
    }

    return (
        <div className="container">
            {error ? <div className="alert alert-danger mt-3" htmlrole="alert">{error}</div> : null}
            {info ? <div className="alert alert-success mt-3" htmlrole="alert">{info}</div> : null}
            <Avatar className="test"></Avatar>
            <span>{`Last login ${getDateFromFirebaseString(user.lastLoginAt)}`}</span>
            <span>{`member since ${getDateFromFirebaseString(user.createdAt)}`}</span>
            <div className="form-group row">
                <label htmlFor="nickname" className="col-4 col-form-label">Nickname</label>
                <div className="col-8">
                    <InputField id={NICKNAME_INPUT_ID} labelText="nickname" value={user.displayName}></InputField>
                    <InputField id={CAKEDATE_INPUT_ID} labelText="Cake date" value={user.birthday}></InputField>
                </div>
            </div>
            <div className="form-group row">
                <div className="offset-4 col-8">
                    <button className="btn btn-primary" onClick={updateUser}>Update</button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Profile);