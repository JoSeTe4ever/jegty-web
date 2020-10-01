import React, { useState, useContext, useEffect } from 'react'
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

    const submitLoginForm = async e => {
        e.preventDefault();
        const { usuario, clave } = e.target.elements;

        await app
            .auth()
            .signInWithEmailAndPassword(usuario.value, clave.value)
            .then(result => {
                console.log(result);
                history.push("/");
            })
            .catch(error => {
                seterror(error.message)
            });

    };

    useEffect(() => {
        if (usuario) {
            dispatch(logValidUser(true));
            //history.push("/home");
        }
    }, [history, usuario]);


    return (
        <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
                ERROR-> {error}
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <IconSvg className="logoIcon"></IconSvg>
                        <h4 className="modal-title">Modal Header</h4>
                    </div>
                    <div className="modal-body">
                        <p>Some text in the modal.</p>
                        <form className="form-group form-horizontal" onSubmit={submitLoginForm}>
                            <InputField id="email" labelText="E-mail"></InputField>
                            <InputField id="password" labelText="Password" type="password"></InputField>
                            <InputField id="repeatpassword" labelText="Repeat password" type="password"></InputField>
                        </form>
                        <button type="submit" className="btn btn-primary">Log in</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal"
                            onClick={() => dispatch(showDialog(false))}>Close</button>
                    </div>
                </div>

            </div>
        </div>);

}
