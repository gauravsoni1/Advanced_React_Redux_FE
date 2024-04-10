import { Outlet } from "react-router-dom";
import Modal from "../../redux/components/Modal/Modal";

const Landing = () => {
    return <div>
        <Outlet />
        <Modal />
    </div>
}

export default Landing;