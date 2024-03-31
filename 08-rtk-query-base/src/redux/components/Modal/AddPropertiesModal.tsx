import { Box, Button, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { closeModal } from "../../slice/modalSlice";
import { Field, reduxForm } from "redux-form";
import Form from '../../../const/form';
import ReduxTextField from "../ReduxTextField";
import { useTranslation } from "../../../../node_modules/react-i18next";
import { Translations } from "../../../const/translations";

const { ADD_PROPERTY: { formName, formFields } } = Form;

const AddProperties = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return <>
        <DialogTitle sx={{ minWidth: "350px", display: 'flex', justifyContent: 'space-between' }}>{t(Translations.ADD_PROPERTY)}
            <IconButton onClick={() => dispatch(closeModal())}>
                <Close />
            </IconButton>
        </DialogTitle>
        <DialogContent>
            <Box padding={1}>
                <form>
                    <Field name={formFields.name} label="Property Name" variant="standard" component={ReduxTextField}></Field>
                    <Field name={formFields.description} label="Descrption" variant="standard" component={ReduxTextField}></Field>
                    <Field name={formFields.neighborhood_overview} label="Neighbourhood overview" variant="standard" component={ReduxTextField}></Field>
                    <Field name={formFields.price} label="Price" variant="standard" component={ReduxTextField}></Field>
                    <Field name={formFields.summary} label="Summary" variant="standard" component={ReduxTextField}></Field>
                </form>
            </Box>
        </DialogContent>
        <Box sx={{ padding: '16px 24px' }}>
            <Button variant='contained'>Submit</Button>
            <Button variant='text'>Cancel</Button>
        </Box>
    </>
}

export default reduxForm({
    form: formName
})(AddProperties);