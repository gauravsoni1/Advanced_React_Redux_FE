import { includes, forEach, isEmpty } from "lodash-es";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserPermissions } from "../redux/selectors/userSelectors";
import { Permissions } from "../const/permissions";

export const useIsAuthorized = (permissions: Permissions[]) => {
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
                console.log({ permissions, reqPermission });
                if (!includes(userPermissions, reqPermission)) {
                    return setIsPermitted(false);
                }
            })
        }
    }, [])

    console.log({ isPermitted })
    return isPermitted;
}