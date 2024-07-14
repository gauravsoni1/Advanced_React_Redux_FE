import { Box, IconButton, Popover } from "@mui/material";
import { useRef, useState } from "react";
import HouseIcon from "@mui/icons-material/HouseSharp";
import DistrictItem from "./DistrictItem";
import districtList from '../../../../districts.json';
import { FixedSizeList as VirtualList } from 'react-window';

const District = () => {
    const districtButtonRef = useRef(null);
    const [districtOpen, setDistrictOpen] = useState(false);

    const handleOpendistrict = () => {
        setDistrictOpen(!districtOpen);
    };

    const Item = ({ index, style }) => {
        return (
            <DistrictItem
                style={style}
                key={districtList[index]}
                title={districtList[index]}
            />
        )
    }

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
            {/* <VirtualList itemSize={50} itemCount={districtList?.length} height={500} width={200}>
                {Item}
            </VirtualList> */}
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
                    {/* {districtList?.map(
                        (district: string) => (
                            <DistrictItem
                                key={district}
                                title={district}
                            />
                        )
                    )} */}
                    <VirtualList itemSize={50} itemCount={districtList?.length} height={500} width={200}>
                        {Item}
                    </VirtualList>

                </Box>
            </Popover>
        </>
    );
};

export default District;
