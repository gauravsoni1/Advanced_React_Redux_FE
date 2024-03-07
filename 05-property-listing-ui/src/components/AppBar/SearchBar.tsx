import { Paper, InputBase, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material';
import { useState } from "react";

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');

    const onChange = (event: any) => {
        setSearchValue(event?.target?.value);
    }

    return (
        <Paper sx={{ p: '1px 2px', display: "flex", width: '300px', justifyContent: 'space-between' }}>
            <InputBase sx={{flex: 1}} placeholder="Search Property" value={searchValue} onChange={onChange} />
            <IconButton>
                <Search />
            </IconButton>
        </Paper>
    )
}

export default SearchBar;