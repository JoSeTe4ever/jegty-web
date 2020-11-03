import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
/**
 * Input field 
 * 
 * type password or date.
 *
 * @param {*} props
 * @returns
 */
export const InputField = (props) => {

    const { id, labelText, value, innerRef, type, readonly } = props;
    const [text, setText] = useState(value);
    
    const handleChange = (e) => {
        setText(e.target.value);
        innerRef.current.value = e.target.value;
        console.log(innerRef.current.value);
    }

    let regularTextField = <TextField
        id={id}
        label={labelText}
        value={text || ""}
        onChange={handleChange}
        variant="outlined"
        ref={innerRef}
    />;

    const readOnlyTextField = <TextField
        id={id}
        label={labelText}
        value={text || ""}
        onChange={handleChange}
        variant="outlined"
        ref={innerRef}
        InputProps={{
            readOnly: true,
        }}
    />;

    if (type === "password") {
        regularTextField = <TextField
            id={id}
            label={labelText}
            value={text || ""}
            onChange={handleChange}
            variant="outlined"
            type="password"
            ref={innerRef}
        />;
    }
    const toReturn = readonly ? readOnlyTextField : regularTextField
    return toReturn;

}
