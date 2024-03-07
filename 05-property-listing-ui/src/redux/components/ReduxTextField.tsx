import { Box, Icon, TextField } from '@mui/material';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

export type ReduxTextFieldTypes = {
    input: WrappedFieldInputProps,
    label: string;
    type: string;
    meta: WrappedFieldMetaProps
}

const ReduxTextField = ({ input: { onChange, value, name }, meta: { error, touched }, label, type = "text" }: ReduxTextFieldTypes) => {
    console.log({ error, touched })
    return (
        <TextField
            sx={{ marginBottom: '12px' }}
            name={name}
            onChange={onChange}
            value={value}
            label={label}
            type={type}
            helperText={touched && error || ""}
            error={!!touched && !!error}
        />
    )
}

export default ReduxTextField;