import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FloatingMenu from "./FloatingMenu/FloatingMenu";
import { useSelector } from "react-redux";
import { selectUserLanguage } from "../../redux/selectors/userSelectors";
import i18next from "i18next";
import { useEffect } from "react";

const PropertyListing = () => {
    const userLang = useSelector(selectUserLanguage);

    useEffect(() => {
        console.log("updated user lang");
        i18next.changeLanguage(userLang);
    }, [userLang])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }} disableGutters maxWidth={false}>
            <AppBar></AppBar>
            <CategoryBar></CategoryBar>
            <PropertyCard></PropertyCard>
            <FloatingMenu />
        </Container>
    )

}

export default PropertyListing;