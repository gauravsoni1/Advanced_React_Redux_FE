import { Paper, InputBase, IconButton } from "@mui/material";
import { Search } from '@mui/icons-material';
import { useEffect, useState } from "react";
import { useLazySearchPropertyQuery } from "../../hooks/api/property.api";
import { debounce } from 'lodash-es'

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchProperty, { isFetching, isError, isSuccess, data }] = useLazySearchPropertyQuery();

    console.log(data)

    const onChange = (event: any) => {
        setSearchValue(event?.target?.value);
    }

    useEffect(() => {
        if (searchValue) {
            const debouncedSearchPropery = debounce(()=> searchProperty(searchValue), 3000);
            debouncedSearchPropery();
        }
    }, [searchValue])

    return (
        <Paper sx={{ p: '1px 2px', display: "flex", width: '300px', justifyContent: 'space-between' }}>
            <InputBase sx={{ flex: 1 }} placeholder="Search Property" value={searchValue} onChange={onChange} />
            <IconButton>
                <Search />
            </IconButton>
        </Paper>
    )
}

export default SearchBar;