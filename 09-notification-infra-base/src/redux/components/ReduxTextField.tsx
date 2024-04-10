import { Box, Icon, TextField } from '@mui/material';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

export type ReduxTextFieldTypes = {
    input: WrappedFieldInputProps,
    label: string;
    type: string;
    meta: WrappedFieldMetaProps
}

const ReduxTextField = ({ input: { onChange, value, name }, meta: { error, touched }, label, type = "text" }: ReduxTextFieldTypes) => {
    return (
        <TextField

            sx={{ marginBottom: '12px', width: '100%' }}
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