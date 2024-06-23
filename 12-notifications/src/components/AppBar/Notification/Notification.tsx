import { Box, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import NotificationIcon from "@mui/icons-material/NotificationsOutlined";
import { useGetNotificationListQuery } from "../../../hooks/api/notification.api";

const Notification = () => {
    const notificationButtonRef = useRef(null);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const { data: notificationData, isLoading } = useGetNotificationListQuery(null);

    const handleOpenNotification = () => {
        setNotificationOpen(!notificationOpen);
    };

    return (
        <>
            <IconButton
                ref={notificationButtonRef}
                onClick={handleOpenNotification}
                sx={{
                    color: "white",
                    marginRight: "8px",
                }}
            >
                <NotificationIcon
                    sx={{
                        width: "30px",
                        height: "30px",
                    }}
                />
            </IconButton>
            <Popover
                disableScrollLock={true}
                anchorEl={notificationButtonRef.current}
                open={notificationOpen}
                onClose={() => setNotificationOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box margin={1}>
                    {notificationData?.map(
                        (notification: { title: string; message: string; _id: string }) => (
                            <NotificationItem
                                key={notification?._id}
                                title={notification?.title}
                                message={notification?.message}
                            />
                        )
                    )}
                </Box>
            </Popover>
        </>
    );
};

export default Notification;
