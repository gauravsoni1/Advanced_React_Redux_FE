import { Chip, Container, Paper } from "@mui/material";
import { Snowboarding } from '@mui/icons-material';

const CategoryBar = () => {

    return (
        <Container sx={{ marginTop: '64px' }} disableGutters maxWidth={false}>
            <Paper sx={{ padding: 1 }}>
                <Chip avatar={<Snowboarding />} label="Snow Resort"></Chip>
            </Paper>
        </Container>
    )
}

export default CategoryBar;