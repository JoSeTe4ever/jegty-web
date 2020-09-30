import React from 'react'

export const InputField = (props) => {
    const { id, labelText } =  props;
    return (
        <div className="form-group">
            <label className="col-sm-2 control-label" htmlFor={id}>{labelText ? labelText.toString() : ''}</label>
            <input className="form-control" id={id} type="text"></input>
        </div>
    )
}
