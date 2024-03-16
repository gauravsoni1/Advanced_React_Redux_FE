import { Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import { modalState } from "../../selectors/modalSelectors";
import SuccessModal from "./SuccessModal";
import AddProperties from "./AddPropertiesModal";
import { Modal_Types } from "../../slice/modalSlice";


const Modal = () => {
    const modalSelector = useSelector(modalState);
    const { type } = modalSelector;

    const renderModal = (type: Modal_Types) => {
        switch (type) {
            case Modal_Types.SUCCESS:
                return <SuccessModal />
            case Modal_Types.ADD_PROPERTIES:
                return <AddProperties />
            default:
                break;
        }
    }

    console.log(modalSelector);

    return (
        <Dialog open={modalSelector.open}>
            {renderModal(type as Modal_Types)}
        </Dialog>
    )
}

export default Modal;