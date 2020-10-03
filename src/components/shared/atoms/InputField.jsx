import React, { useState } from 'react'

export const InputField = (props) => {
    const { id, labelText, value, type } = props;
    const [text, setText] = useState(value);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div className="form-group">
            <label className="col-sm-2 control-label" htmlFor={id}>{labelText ? labelText.toString() : ''}</label>
            <input className="form-control" id={id} type={type ? type : text} onChange={handleChange} value={text || ""}></input>
        </div>
    )
}
