import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { notificationState } from "../../selectors/notificationSelectors";
import { closeNotification } from "../../slice/notificationSlice";

const Notification = () => {
    const notificationData = useSelector(notificationState)
    const dispatch = useDispatch();

    return <Snackbar open={notificationData.open} autoHideDuration={4000} onClose={() => dispatch(closeNotification())}>
        <Alert
            onClose={() => dispatch(closeNotification())}
            severity={notificationData.type}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {notificationData.message}
        </Alert>
    </Snackbar>
}

export default Notification;