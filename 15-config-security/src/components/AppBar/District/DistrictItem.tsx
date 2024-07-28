import { Box, Divider, Typography } from "@mui/material";

export interface DistrictItemProps {
    title?: string;
    message?: string;
    style?: any
}
const DistrictItem = ({ title, message, style }: DistrictItemProps) => {
    return (
        <div style={style}>
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
        </div>
    );
};

export default DistrictItem;
