import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addLogedUser, logValidUser } from '../redux/actions/actions';
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
import { app, db } from './../data/firebase';
import { InputField } from './shared/atoms/InputField';
import { LoadingBar } from './shared/atoms/LoadingBar';
import { VALID_EMAIL } from "./../../src/helpers/validators"

/****
 * Componente Login con estado de sign in y sign up 
 * llama a firebase para crear usuarios o para autenticarlos.
 */

export const Login = () => {

    const dispatch = useDispatch();
    const [error, seterror] = useState('');
    const [info, setInfo] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [signIn, setSignIn] = useState(true);
    const EMAIL_INPUT_ID = "email";
    const PASSWORD_INPUT_ID = "password";
    const REPEAT_PASSWORD_INPUT_ID = "repeatpassword";
    let email, pass, repeat = "";

    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const inputRepeat = useRef(null);

    const submitLoginForm = async e => {
        try {
            setLoading(true);
            const userInput = inputEmail.current.value;
            const passInput = inputPassword.current.value;
            await app
                .auth()
                .signInWithEmailAndPassword(userInput, passInput)
                .then(result => {
                    dispatch(addLogedUser(result.user));
                    dispatch(logValidUser(true));
                })
                .catch(error => {
                    seterror(`${error.message} Error while authenticating`);
                }).finally(() => {
                    setLoading(false);
                });
        } catch (e) {
            console.log("e" + e);
        } finally {
            setLoading(false);
        }
    };

    const submitRegisterForm = async e => {
        setLoading(true);
        const userInput = inputEmail.current.value;
        const passInput = inputPassword.current.value;
        const repeatInput = inputRepeat.current.value;

        if (passInput !== repeatInput) {
            seterror("Password and repeat password does not match");
            setLoading(false);
        } else { 
            await app
                .auth()
                .createUserWithEmailAndPassword(userInput, passInput)
                .then(result => {
                    setSignIn(true);
                    setInfo(`User ${result.user.email}successfully created`);
                    seterror('');
                    db.collection('users').doc(result.user.uid).set({
                        email: result.user.email,
                        id: result.user.uid,
                        name: '',
                        birthdate: '',
                        createdAt: new Date()
                    });
                    setLoading(false);
                })
                .catch(error => {
                    seterror(error.message);
                    setLoading(false);
                });
        }
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
                            {isLoading ? <LoadingBar></LoadingBar> : null}
                            <p>Enter your credentials</p>
                            <div className="d-flex flex-column">
                                <InputField id={EMAIL_INPUT_ID} labelText="E-mail" value={email} innerRef={inputEmail} validator={VALID_EMAIL}
                                    errorText="Valid email required" required></InputField>
                                <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password" value={pass} innerRef={inputPassword} required></InputField>
                                <div className="d-flex justify-content-center mt-2">
                                    <button onClick={() => {
                                        submitLoginForm();
                                    }} className="btn btn-primary">Log in</button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <span>Do not have an account? <button className="btn btn-link" onClick={() => {
                                    toggleView();
                                }}>Sign up here</button></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal"
                                onClick={() => toggleView()}>Close</button>
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
                            {isLoading ? <LoadingBar></LoadingBar> : null}

                            <p>Register your credentials</p>
                            <div className="d-flex flex-column">
                                <InputField id={EMAIL_INPUT_ID} labelText="E-mail" value={email} innerRef={inputEmail} validator={VALID_EMAIL}
                                    errorText="Valid email required" required>></InputField>
                                <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password" value={pass} innerRef={inputPassword} required></InputField>
                                <InputField id={REPEAT_PASSWORD_INPUT_ID} labelText="Repeat password" type="password" value={repeat} innerRef={inputRepeat} required></InputField>
                                <div className="d-flex justify-content-center mt-2">
                                    <button onClick={() => {
                                        submitRegisterForm();
                                    }} className="btn btn-primary">Sign up</button>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <span>I have an account? <button className="btn btn-link" onClick={() => {
                                    toggleView();
                                }}>Log in here</button></span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal"
                                onClick={() => toggleView()}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
    );

}
