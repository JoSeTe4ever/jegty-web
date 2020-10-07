import React, { useState, useRef, useEffect } from 'react'
import { addLogedUser, addJegtyUser } from "./../../../redux/actions/actions"
import { InputField } from './../../shared/atoms/InputField'
import { connect, useSelector } from "react-redux";
import { Avatar } from "./../../shared/atoms/Avatar";
import { getDateFromFirebaseString } from "./../../../helpers/dates";
import { db } from './../../../data/firebase';
import { useDispatch } from 'react-redux'

export const Profile = (props) => {

    const NICKNAME_INPUT_ID = "nickname";
    const CAKEDATE_INPUT_ID = "cakedate";

    const user = useSelector((state) => state.user);
    const jegtyUser = useSelector((state) => state.jegtyUser);

    const [error, setError] = useState('');
    const [info, setInfo] = useState('');

    const inputNickName = useRef(null);
    const inputBirthdate = useRef(null);

    const dispatch = useDispatch();
    const updateUser = async () => {

       //TODO implement update.
    }

    useEffect(function () {
        if (user != undefined && user.uid != undefined && jegtyUser.id == undefined) {
            // BUSCAR EN lA BBDD Y METERLO EN EL STORE.
            db.collection('users').doc(user.uid).get().then(jegtyUser => {
                jegtyUser = { ...jegtyUser.data()};
                dispatch(addJegtyUser(jegtyUser));
            }).catch(function (error) {
                setError(`error` + error);
            });
        }
    }, [])

    return (
        <div className="container">
            {error ? <div className="alert alert-danger mt-3" htmlrole="alert">{error}</div> : null}
            {info ? <div className="alert alert-success mt-3" htmlrole="alert">{info}</div> : null}
            <Avatar className="test"></Avatar>
            <div className="form-group row">
                <label htmlFor="nickname" className="col-4 col-form-label">{user.displayName}</label>
                <div className="col-8">
                    <InputField id={NICKNAME_INPUT_ID} labelText="nickname" value={user.displayName} innerRef={inputNickName}></InputField>
                    <InputField id={CAKEDATE_INPUT_ID} labelText="Cake date" value={user.birthday} innerRef={inputBirthdate}></InputField>
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