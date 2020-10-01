import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { showDialog, logValidUser } from '../redux/actions/actions'
import { InputField } from './shared/atoms/InputField'
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';
import { app } from './../data/firebase';
import { useHistory } from "react-router-dom";
import { Auth } from './../context/AuthContext';

export const Login = () => {

    const dispatch = useDispatch()
    const history = useHistory();
    const [error, seterror] = useState('')
    const { usuario } = useContext(Auth);
    const EMAIL_INPUT_ID = "email";
    const PASSWORD_INPUT_ID = "password";
    const submitLoginForm = async e => {

        e.preventDefault();
        const userInput = e.target.elements[EMAIL_INPUT_ID];
        const passInput = e.target.elements[PASSWORD_INPUT_ID];
        await app
            .auth()
            .signInWithEmailAndPassword(userInput.value, passInput.value)
            .then(result => {
                console.log(result);
                dispatch(logValidUser(true))
            })
            .catch(error => {
                seterror(error.message)
            });

    };

    return (
        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <IconSvg className="logoIcon"></IconSvg>
                        <h4 className="modal-title">Modal Header</h4>
                    </div>
                    <div className="modal-body">
                        {error ? <div className="alert alert-danger" htmlrole="alert">{error}</div> : null}
                        <p>Some text in the modal.</p>
                        <form className="form-group form-horizontal" onSubmit={submitLoginForm}>
                            <InputField id={EMAIL_INPUT_ID} labelText="E-mail"></InputField>
                            <InputField id={PASSWORD_INPUT_ID} labelText="Password" type="password"></InputField>
                            <InputField id="repeatpassword" labelText="Repeat password" type="password"></InputField>
                            <button htmltype="submit" className="btn btn-primary">Log in</button>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal"
                            onClick={() => dispatch(showDialog(false))}>Close</button>
                    </div>
                </div>

            </div>
        </div>);

}
