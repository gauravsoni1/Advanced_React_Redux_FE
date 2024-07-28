import { Box, Divider, Typography } from "@mui/material";

export interface NotificationItemProps {
    title?: string;
    message?: string;
}
const NotificationItem = ({ title, message }: NotificationItemProps) => {
    return (
        <Box sx={{ maxWidth: 300 }}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography
                sx={{ marginTop: "10px", color: "grey" }}
                variant="body2"
            >
                {message}
            </Typography>
            <Divider sx={{ margin: "10px 0px" }} />
        </Box>
    );
};

export default NotificationItem;
