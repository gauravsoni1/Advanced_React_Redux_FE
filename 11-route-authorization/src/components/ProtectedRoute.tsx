import { ReactElement } from "react";
import { useIsAuthorized } from "../hooks/useIsAuthorized";
import { Permissions } from "../const/permissions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ permissions, children }: { permissions: Permissions[], children: ReactElement }) => {
    const isAuthorized = useIsAuthorized(permissions)

    if (!isAuthorized) {
        // Add all the logic to clear user state ... 
        return <Navigate to="/signin" />
    }
    return children;
}

export default ProtectedRoute;