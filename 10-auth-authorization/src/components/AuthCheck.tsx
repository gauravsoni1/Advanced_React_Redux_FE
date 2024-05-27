import { ReactElement, useEffect, useState } from "react";
import { Permissions } from "../const/permissions";
import { forEach, includes, isEmpty } from "lodash-es";
import { useSelector } from "react-redux";
import { selectUserPermissions } from "../redux/selectors/userSelectors";

const AuthCheck = ({ permissions, children }: { permissions: Permissions[], children: ReactElement }) => {
    const [isPermitted, setIsPermitted] = useState(true);
    const userPermissions = useSelector(selectUserPermissions);
    console.log({ userPermissions })

    useEffect(() => {
        if (isEmpty(userPermissions)) {
            setIsPermitted(false);
        } else if (includes(userPermissions, "*")) {
            setIsPermitted(true);
        } else {
            forEach(permissions, reqPermission => {
                console.log({permissions, reqPermission});
                if (!includes(userPermissions, reqPermission)) {
                    return setIsPermitted(false);
                }
            })
        }
    }, [])

    console.log({ isPermitted })
    return (
        <>{isPermitted ? children : null}</>
    )
}

export default AuthCheck;