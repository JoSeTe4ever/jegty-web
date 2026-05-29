import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addLogedUser, logValidUser } from '../redux/actions/actions';
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
import { getPocketBaseErrorMessage, loginWithEmail, registerWithEmail } from './../data/pocketbase';
import { InputField } from './shared/atoms/InputField';
import { LoadingBar } from './shared/atoms/LoadingBar';
import { VALID_EMAIL } from "./../../src/helpers/validators"

/****
 * Componente Login con estado de sign in y sign up 
 * Login component with sign in and sign up states.
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
            await loginWithEmail(userInput, passInput)
                .then(result => {
                    dispatch(addLogedUser(result.user));
                    dispatch(logValidUser(true));
                })
                .catch(error => {
                    seterror(`${getPocketBaseErrorMessage(error)} Error while authenticating`);
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
            await registerWithEmail(userInput, passInput)
                .then(result => {
                    setSignIn(true);
                    setInfo(`User ${result.user.email}successfully created`);
                    seterror('');
                    setLoading(false);
                })
                .catch(error => {
                    seterror(getPocketBaseErrorMessage(error));
                    setLoading(false);
                });
        }
    };

    const toggleView = () => {
        setSignIn(!signIn);
        seterror('');
    }

    const title = signIn ? "Player one, ready?" : "Join the party";
    const description = signIn
        ? "Entra y prepara la siguiente quedada gaming con tu equipo."
        : "Crea tu perfil para guardar juegos, salas y amigos.";
    const submitText = signIn ? "Log in" : "Sign up";
    const switchText = signIn ? "Do not have an account?" : "Already have an account?";
    const switchActionText = signIn ? "Sign up here" : "Log in here";

    return (
        <div className="modal fade auth-modal" id="myModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered auth-modal__dialog">
                <div className="modal-content auth-modal__content">
                    <button type="button" className="auth-modal__close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div className="auth-modal__hero">
                        <div className="auth-modal__badge">N64 night</div>
                        <IconSvg className="logoIcon auth-modal__logo"></IconSvg>
                    </div>
                    <div className="modal-body auth-modal__body">
                        {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
                        {info ? <div className="alert alert-success" role="alert">{info}</div> : null}
                        {isLoading ? <LoadingBar></LoadingBar> : null}
                        <p className="auth-modal__eyebrow">Jegty team gaming</p>
                        <h2 className="auth-modal__title">{title}</h2>
                        <p className="auth-modal__description">{description}</p>
                        <div className="auth-modal__form">
                            <InputField id={EMAIL_INPUT_ID} labelText="E-mail" value={email} innerRef={inputEmail} validator={VALID_EMAIL}
                                errorText="Valid email required" required></InputField>
                            <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password" value={pass} innerRef={inputPassword} required></InputField>
                            {!signIn ? <InputField id={REPEAT_PASSWORD_INPUT_ID} labelText="Repeat password" type="password" value={repeat} innerRef={inputRepeat} required></InputField> : null}
                            <button onClick={() => {
                                signIn ? submitLoginForm() : submitRegisterForm();
                            }} className="btn btn-primary auth-modal__submit">{submitText}</button>
                        </div>
                        <div className="auth-modal__switch">
                            <span>{switchText} <button className="btn btn-link auth-modal__switch-button" onClick={() => {
                                toggleView();
                            }}>{switchActionText}</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
