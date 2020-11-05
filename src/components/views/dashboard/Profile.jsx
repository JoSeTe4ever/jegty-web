import React, { useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon } from '../../shared/atoms/Icon';
import { app, db } from './../../../data/firebase';
import { addJegtyUser, logValidUser } from "./../../../redux/actions/actions";
import { InputField } from './../../shared/atoms/InputField';
import { LoadingBar } from './../../shared/atoms/LoadingBar';
import './../../views/views.scss';
import { Avatar } from '../../shared/atoms/Avatar';

export const Profile = (props) => {

    const NICKNAME_INPUT_ID = "nickname";
    const CAKEDATE_INPUT_ID = "cakedate";
    const EMAIL_INPUT_ID = "email";

    const user = useSelector((state) => state.user);
    const jegtyUser = useSelector((state) => state.jegtyUser);

    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [isLoading, setLoading] = useState(false);

    const inputNickName = useRef(null);
    const inputBirthdate = useRef(null);
    const email = useRef(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const _logout = () => {
        dispatch(logValidUser(false));
    }

    const displayMessage = (message, type) => {
        if (type === "INFO") {
            setInfo(message);
            setTimeout(() => {
                setInfo('');
            }, parseInt(5000));
        }

        if (type === "ERROR") {
            setError(message);
            setTimeout(() => {
                setInfo('');
            }, parseInt(5000));
        }
    };

    const updateUser = async () => {
        setLoading(true);
        const updatedUser = { ...jegtyUser, displayName: inputNickName.current.value, birthday: inputBirthdate.current.value };
        db.collection('users').doc(user.uid).set(updatedUser).then(
            (result) => {
                displayMessage(`User ${result} sucessfully updated`, "INFO");
                dispatch(addJegtyUser(updatedUser));
                setLoading(false);
            }
        ).catch(error => {
            displayMessage(`Error updating, ${error}`, "ERROR");
            setLoading(false);
        })
    }

    const deleteUser = async (event) => {
        setLoading(true);
        const currentUser = app.auth().currentUser;
        let errorObtained = undefined;

        await db.collection('users').doc(currentUser.uid).delete().then(
            (result) => {
                currentUser.delete().then(() => {
                    displayMessage(`User ${result} sucessfully updated`, "INFO");
                    dispatch(logValidUser(false));
                }).catch(function (error) {
                    errorObtained = error;
                    displayMessage(errorObtained, "ERROR");
                    setLoading(false);
                });
            }
        )
    }
    
    return (
        <div className="container profileContainer">
            {error ? <div className="alert alert-danger mt-3 fade show" htmlrole="alert">{error}</div> : null}
            {info ? <div className="alert alert-success mt-3 fade show" htmlrole="alert">{info}</div> : null}
            {isLoading ? <LoadingBar></LoadingBar> : null}
            <h4 className="mt-2">SETTINGS</h4>
            <div className="row mt-2 justify-content-end">
                <div className="col-2">
                    <Avatar email={jegtyUser.email} value={jegtyUser.name} customClass={"profileAvatar"}></Avatar>
                </div>
                <div className="col-10">
                    <div className="form-group">
                        <div className=".col-md-6 .offset-md-3">
                            <InputField id={NICKNAME_INPUT_ID} labelText="nickname" value={jegtyUser.name} innerRef={inputNickName}></InputField>
                            <InputField id={CAKEDATE_INPUT_ID} labelText="Cake date" value={jegtyUser.birthday} innerRef={inputBirthdate} type="datetime-local"></InputField>
                            <InputField id={EMAIL_INPUT_ID} labelText="email" value={jegtyUser.email} innerRef={email} readonly={true}></InputField>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-icon">
                            <Icon icon="sign-out" aria-hidden="true" onClickCallback={() => _logout()}></Icon>
                            <span>Sign out</span>
                        </div>
                        
                        <div className="form-icon">
                            <Icon icon="ban" aria-hidden="true" onClickCallback={() => history.push("friends")}></Icon>
                            <span>Banned people</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="d-flex flex-column">
                            <button className="btn btn-primary float-right col-2 profileButton mb-2" onClick={updateUser}>Update</button>
                            <button data-toggle="modal" data-target="#confirmationModal"
                                className="btn btn-danger float-right col-2 profileButton">Delete</button>
                        </div>
                    </div>


                    <div className="d-flex justify-content-center">
                        <ul className="list-group list-group-horizontal">
                            <li className=""><a href="#" className="badge badge-light mr-3">About Jegty</a></li>
                            <li className=""><a href="#" className="badge badge-light mr-3">Privacy policy</a></li>
                            <li className=""><a href="#" className="badge badge-light mr-3">Help</a></li>
                        </ul>
                    </div>
                </div>

            </div>


            <div className="modal fade" id="confirmationModal" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            Delete user
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete your user? You will be automatically logged out
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-danger" onClick={(event) => deleteUser(event)}>Accept</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(Profile);