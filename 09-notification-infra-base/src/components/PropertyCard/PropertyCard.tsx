import { Box, Typography, styled } from "@mui/material";
import { Star } from '@mui/icons-material';
import Image from '../../assets/auth_background.avif';
import { blueGrey, yellow } from '@mui/material/colors';
import { useTranslation } from "../../../node_modules/react-i18next";

const PropertyCard = () => {
    const { t } = useTranslation();

    return (
        <Box width={"300px"}>
            <StyledImage src={Image}></StyledImage>
            <Box padding={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h6'>{t('Property Name', {name: "Square tower", rating: 5})}</Typography>
                    <Box display={'flex'}>
                        <Typography>9.0</Typography>
                        <Star sx={{ color: yellow[700] }}></Star>
                    </Box>
                </Box>
                <Typography color={blueGrey[700]}>205.00 USD / night</Typography>
            </Box>
        </Box>
    )
}

const StyledImage = styled('img')({
    borderRadius: '12px',
    width: 'inherit',
    height: '200px'
})

export default PropertyCard;