import React from 'react'
import { useDispatch } from 'react-redux'
import { showDialog, logValidUser } from '../redux/actions/actions'
import { InputField } from './shared/atoms/InputField'
import { ReactComponent as IconSvg } from './../assets/icons/icono.svg';

export const Login = () => {

    const dispatch = useDispatch()

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
                        <p>Some text in the modal.</p>
                        <form className="form-group form-horizontal">
                            <InputField id="email" labelText="E-mail"></InputField>
                            <InputField id="password" labelText="Password" type="password"></InputField>
                            <InputField id="repeatpassword" labelText="Repeat password" type="password"></InputField>
                        </form>
                        <button
                            onClick={() => dispatch(logValidUser(true))}
                            className="btn btn-lg">Log in</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal"
                            onClick={() => dispatch(showDialog(false))}>Close</button>
                    </div>
                </div>

            </div>
        </div>);

}
