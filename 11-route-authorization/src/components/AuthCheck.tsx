import { ReactElement } from "react";
import { Permissions } from "../const/permissions";
import { useIsAuthorized } from "../hooks/useIsAuthorized";

const AuthCheck = ({ permissions, children }: { permissions: Permissions[], children: ReactElement }) => {
    const isAuthorized = useIsAuthorized(permissions)

    return (
        <>{isAuthorized ? children : null}</>
    )
}

export default AuthCheck;