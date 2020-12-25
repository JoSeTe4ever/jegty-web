import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';

/**
 * Input field 
 * 
 * type password or date. It allows validation with regex, helpertext and error text. 
 * 
 *
 * @param {*} props
 * @returns
 */
export const InputField = (props) => {

    const { id, labelText, value, innerRef, type, readonly, helperText, validator, required, errorText } = props;
    const [text, setText] = useState(value);
    let hasError = false;
    let helper = "";

    if (validator && !validator.test(text)) {
        hasError = true;
        helper = errorText;
    } else {
        helper = helperText;
    }

    const handleChange = (e) => {
        setText(e.target.value);
        innerRef.current.value = e.target.value;

    }

    let regularTextField = <TextField
        className="mb-2"
        id={id}
        label={labelText}
        value={text || ""}
        onChange={handleChange}
        variant="outlined"
        {...(hasError ? { error: true } : { error: false })}
        {...(required ? { required: true } : { required: false })}
        {...(helper ? { helperText: helper } : {})}
        {...(type === "password" ? { type: "password" } : {})}
        {...(type === "datetime-local" ? { type: "datetime-local" } : {})}
        ref={innerRef}
    />;

    const readOnlyTextField = <TextField
        className="mb-2"
        id={id}
        label={labelText}
        value={text || ""}
        onChange={handleChange}
        variant="outlined"
        ref={innerRef}
        helperText={errorText}
        InputProps={{
            readOnly: true,
        }}
    />;

    const toReturn = readonly ? readOnlyTextField : regularTextField
    return toReturn;

}
