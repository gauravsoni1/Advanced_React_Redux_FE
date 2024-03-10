import { Container } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import FloatingMenu from "./FloatingMenu/FloatingMenu";

const PropertyListing = () => {
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