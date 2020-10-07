import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { db } from './../../../data/firebase';
import { addJegtyUser } from "./../../../redux/actions/actions";
import { Avatar } from "./../../shared/atoms/Avatar";
import { InputField } from './../../shared/atoms/InputField';

export const Profile = (props) => {

    const NICKNAME_INPUT_ID = "nickname";
    const CAKEDATE_INPUT_ID = "cakedate";
    const EMAIL_INPUT_ID = "email";

    const user = useSelector((state) => state.user);
    const jegtyUser = useSelector((state) => state.jegtyUser);

    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const inputNickName = useRef(null);
    const inputBirthdate = useRef(null);
    const email = useRef(null);

    const dispatch = useDispatch();

    const displayMessage = (message, type) => {
        if (type === "INFO") {
            setInfo(message);
            setTimeout(() => {
                setInfo('');
            }, parseInt(5000));
        }

        if (type === "ERROR") {
            setInfo(message);
            setTimeout(() => {
                setInfo('');
            }, parseInt(5000));
        }
    };

    const updateUser = async () => {
        const updatedUser = { ...jegtyUser, displayName: inputNickName.current.value, birthday: inputBirthdate.current.value };
        db.collection('users').doc(user.uid).set(updatedUser).then(
            (result) => {
                displayMessage(`User ${result} sucessfully updated`, "INFO");
                dispatch(addJegtyUser(updatedUser));
            }
        )
    }

    useEffect(function () {
        if (user != undefined && user.uid != undefined && jegtyUser.id == undefined) {
            // BUSCAR EN lA BBDD Y METERLO EN EL STORE.
            db.collection('users').doc(user.uid).get().then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data() };
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                displayMessage(`error` + error, "ERROR");
            });
        }
    }, [])

    return (
        <div className="container">
            {error ? <div className="alert alert-danger mt-3 fade show" htmlrole="alert">{error}</div> : null}
            {info ? <div className="alert alert-success mt-3 fade show" htmlrole="alert">{info}</div> : null}
            <Avatar className="test" email={user.email}></Avatar>
            <div className="form-group row">
                <label htmlFor="nickname" className="col-4 col-form-label">{user.displayName}</label>
                <div className="col-8">
                    <InputField id={NICKNAME_INPUT_ID} labelText="nickname" value={jegtyUser.displayName} innerRef={inputNickName}></InputField>
                    <InputField id={CAKEDATE_INPUT_ID} labelText="Cake date" value={jegtyUser.birthday} innerRef={inputBirthdate}></InputField>
                    <InputField id={EMAIL_INPUT_ID} labelText="email" value={jegtyUser.email} innerRef={email} readonly={true}></InputField>
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