import React from 'react';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';

const FormInput = (props) => {

    const [field, meta] = useField(props);
    const inputProps = {
        label: props.label,
        type: props.type,
        name: props.name,
    }

    return (
        <TextField 
            id={props.name}
            error= {!!meta.error} 
            fullWidth
            {...field}
            {...inputProps} 
            helperText={meta.error}
            variant="outlined"
            color="primary"
        />         
    )
}

export default FormInput;