import { Container, Grid, styled } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FloatingMenu from "./FloatingMenu/FloatingMenu";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../redux/selectors/userSelectors";
import i18next from "i18next";
import { useEffect } from "react";
import Notification from "../../redux/components/Notification/Notification";
import { useGetPropertyListQuery } from "../../hooks/api/property.api";
import { map } from "lodash-es";

const PropertyListing = () => {
    const userLang = useSelector(selectUserLanguage);

    const { data = [], isLoading, isError, isFetching } = useGetPropertyListQuery(null);

    // console.log({ data });

    useEffect(() => {
        // console.log("updated user lang");
        i18next.changeLanguage(userLang);
    }, [userLang])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }} disableGutters maxWidth={false}>
            <AppBar></AppBar>
            <CategoryBar></CategoryBar>
            <Grid container spacing={3} padding={2}>
                {map(data, (property) => (
                    <StyledGridItem item xs={6} md={3} lg={2} key={property?._id}>
                        <PropertyCard
                            key={property?._id}
                            imgSrc={property?.images?.picture_url}
                            name={property.name}
                            price={property.price}
                            rating={property?.review_score?.review_scores_rating} />
                    </StyledGridItem>
                ))}
            </Grid>
            <FloatingMenu />
            <Notification />
        </Container>
    )
}

const StyledGridItem = styled(Grid)`
  && {
    flex-basis: 50%; // Two items per row on medium screens
    @media (max-width: 960px) {
      flex-basis: 100%; // One item per row on small screens
    }
  }
`;

export default PropertyListing;