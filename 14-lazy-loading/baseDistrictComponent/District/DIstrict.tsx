import { Box, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import HouseIcon from "@mui/icons-material/HouseSharp";
import DistrictItem from "./DistrictItem";
import districtList from '../../../../districts.json';

const District = () => {
    const districtButtonRef = useRef(null);
    const [districtOpen, setDistrictOpen] = useState(false);

    const handleOpendistrict = () => {
        setDistrictOpen(!districtOpen);
    };

    return (
        <>
            <IconButton
                ref={districtButtonRef}
                onClick={handleOpendistrict}
                sx={{
                    color: "white",
                    marginRight: "8px",
                }}
            >
                <HouseIcon
                    sx={{
                        width: "30px",
                        height: "30px",
                    }}
                />
            </IconButton>
            <Popover
                disableScrollLock={true}
                anchorEl={districtButtonRef.current}
                open={districtOpen}
                onClose={() => setDistrictOpen(false)}
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
                    {districtList?.map(
                        (district: string) => (
                            <DistrictItem
                                key={district}
                                title={district}
                            />
                        )
                    )}
                </Box>
            </Popover>
        </>
    );
};

export default District;
