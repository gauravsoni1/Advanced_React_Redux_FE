import { Box, Skeleton, Typography, styled } from "@mui/material";
import { Star } from '@mui/icons-material';
import { blueGrey } from '@mui/material/colors';
import { useTranslation } from "../../../node_modules/react-i18next";

export interface PropertyCardProps {
    imgSrc?: string,
    name?: string,
    price?: string,
    rating?: string,
    isLoading?: boolean
}

const PropertyCard = ({ imgSrc, name, price, rating = "1", isLoading = false }: PropertyCardProps) => {
    const { t } = useTranslation();

    return (
        <>
            {isLoading ? <Box>
                <Skeleton variant="rectangular" width="100%" height={200} />
            </Box> :
                <StyledBox width={"300px"}>
                    <StyledImage src={imgSrc}></StyledImage>
                    <Box padding={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>{t('Property Name', { name: name })}</Typography>
                            <Box display={'flex'}>
                                <Typography>{parseFloat(rating) / 10}</Typography>
                                <StyledStar />
                            </Box>
                        </Box>
                        <Typography color={blueGrey[700]}>{price} USD / night</Typography>
                    </Box>
                </StyledBox>
            }
        </>


    )
}

const StyledImage = styled('img')({
    borderRadius: '12px',
    width: '100%',
    height: 'auto'
})

const StyledBox = styled(Box)`
  width: 100%; // Make the box fill the width of its container
  @media (min-width: 600px) {
    max-width: 300px; // Limit maximum width to 300px on larger screens
  }
`;

const StyledStar = styled(Star)`
  font-size: 16px;
  color: 'yellow'
`;

export default PropertyCard;