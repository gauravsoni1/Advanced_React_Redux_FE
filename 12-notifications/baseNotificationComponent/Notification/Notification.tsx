import { Box, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import NotificationIcon from "@mui/icons-material/NotificationsOutlined";

const Notification = () => {
    const notificationButtonRef = useRef(null);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [data, setData] = useState([{ _id: "1", title: "Fortune Tower", message: "New property added was added to the list" }, { _id: "1", title: "Fortune Tower", message: "New property added" }]);

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
                    {data?.map(
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
