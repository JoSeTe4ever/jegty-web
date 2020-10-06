import React from 'react'
import { InputField } from './../../shared/atoms/InputField'
import { connect, useSelector } from "react-redux";
import { Avatar } from "./../../shared/atoms/Avatar";
import { getDateFromFirebaseString } from "./../../../helpers/dates";
import { app } from './../../../data/firebase';

export const Profile = (props) => {

    const NICKNAME_INPUT_ID = "nickname";
    const CAKEDATE_INPUT_ID = "cakedate";

    const user = useSelector((state) => state.user);

    const updateUser = async () => {
        app.auth().updateUser(user.uid, {
            email: 'modifiedUser@example.com',
            phoneNumber: '+11234567890',
            emailVerified: true,
            password: 'newPassword',
            displayName: 'Jane Doe',
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: true
        })
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully updated user', userRecord.toJSON());
            })
            .catch(function (error) {
                console.log('Error updating user:', error);
            });
    }



    return (
        <div className="container">

            <Avatar className="test"></Avatar>
            <span>{`member since ${getDateFromFirebaseString('asdasd')}`}</span>
            <form>
                <div className="form-group row">
                    <label htmlFor="nickname" className="col-4 col-form-label">Nickname</label>
                    <div className="col-8">
                        <InputField id={NICKNAME_INPUT_ID} labelText="nickname" value={'user.displayName'}></InputField>
                        <InputField id={CAKEDATE_INPUT_ID} labelText="Cake date" value={'user.birthday'}></InputField>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-4 col-8">
                    </div>
                </div>
            </form>
        </div>

    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Profile);