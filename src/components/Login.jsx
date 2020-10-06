import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { showDialog, logValidUser, addLogedUser } from '../redux/actions/actions'
import { InputField } from './shared/atoms/InputField'
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
import { app } from './../data/firebase';
import { useHistory } from "react-router-dom";
import { Auth } from './../context/AuthContext';

/****
 * Componente Login con estado de sign in y sign up 
 * llama a firebase para crear usuarios o para autenticarlos.
 * 
 * 
 */
export const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [error, seterror] = useState('');
    const [info, setInfo] = useState('');
    const [signIn, setSignIn] = useState(true);

    const { usuario } = useContext(Auth);
    const EMAIL_INPUT_ID = "email";
    const PASSWORD_INPUT_ID = "password";
    const REPEAT_PASSWORD_INPUT_ID = "repeatpassword";
    let email,pass,repeat = "";

    const submitLoginForm = async e => {
        e.preventDefault();
        const userInput = e.target.elements[EMAIL_INPUT_ID];
        const passInput = e.target.elements[PASSWORD_INPUT_ID];
        await app
            .auth()
            .signInWithEmailAndPassword(userInput.value, passInput.value)
            .then(result => {
                dispatch(logValidUser(true));
                dispatch(addLogedUser(result.user));
            })
            .catch(error => {
                seterror(error.message, "Error while authenticating")
            });

    };

    const submitRegisterForm = async e => {
        e.preventDefault();
        const userInput = e.target.elements[EMAIL_INPUT_ID];
        const passInput = e.target.elements[PASSWORD_INPUT_ID];
        const repeatPassInput = e.target.elements[REPEAT_PASSWORD_INPUT_ID];
        await app
            .auth()
            .createUserWithEmailAndPassword(userInput.value, passInput.value)
            .then(result => {
                setSignIn(true);
                setInfo(`User ${result.user.email}successfully created`);
                seterror('');
            })
            .catch(error => {
                seterror(error.message)
            });
    };

    const toggleView = () => {
        setSignIn(!signIn);
        seterror('');
    }

    return (
        signIn ?
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <div className="d-flex justify-content-center">
                                <IconSvg className="logoIcon p-2"></IconSvg>
                            </div>
                        </div>
                        <div className="modal-body">
                            {error ? <div className="alert alert-danger" htmlrole="alert">{error}</div> : null}
                            {info ? <div className="alert alert-success" htmlrole="alert">{info}</div> : null}
                            <p>Enter your credentials</p>
                            <form className="form-group form-horizontal" onSubmit={submitLoginForm}>
                                <InputField id={EMAIL_INPUT_ID} labelText="E-mail" value={email}></InputField>
                                <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password" value={pass}></InputField>
                                <div className="d-flex justify-content-center">
                                    <button htmltype="submit" className="btn btn-primary">Log in</button>
                                </div>
                            </form>
                            <div className="d-flex justify-content-center">
                            <span>Do not have an account? <button className="btn btn-link" onClick={() => {
                                toggleView();
                            }}>Sign up here</button></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal"
                                onClick={() => dispatch(showDialog(false))}>Close</button>
                        </div>
                    </div>

                </div>
            </div> :
            <div className="modal fade" id="myModal" role="dialog">
                { /* SIGN UP MODE*/}
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div>
                            <div className="d-flex justify-content-center">
                                <IconSvg className="logoIcon p-2"></IconSvg>
                            </div>
                        </div>
                        <div className="modal-body">
                            {error ? <div className="alert alert-danger" htmlrole="alert">{error}</div> : null}
                            {info ? <div className="alert alert-success" htmlrole="alert">{info}</div> : null}
                            <p>Register your credentials</p>
                            <form className="form-group form-horizontal" onSubmit={submitRegisterForm}>
                                <InputField id={EMAIL_INPUT_ID} labelText="E-mail" value={email}></InputField>
                                <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password" value={pass}></InputField>
                                <InputField id={REPEAT_PASSWORD_INPUT_ID} labelText="Repeat password" type="password" value={repeat}></InputField>
                                <div className="d-flex justify-content-center">
                                    <button htmltype="submit" className="btn btn-primary">Sign up</button>
                                </div>
                            </form>
                            <div className="d-flex justify-content-center">
                                <span>I have an account? <button className="btn btn-link" onClick={() => {
                                    toggleView();
                                }}>Log in here</button></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal"
                                onClick={() => dispatch(showDialog(false))}>Close</button>
                        </div>
                    </div>

                </div>
            </div>
    );

}
