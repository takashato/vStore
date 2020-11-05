import React, {useEffect, useState} from 'react';
import usePermission from "../hooks/usePermission";
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";

const ProtectedRoute = ({permissions = [], children, ...rest}) => {
    const permissionValues = usePermission(permissions);
    const staff = useSelector(state => state.staff)
    const [isAllowed, setAllowed] = useState(false);

    useEffect(() => {
        if (!staff) {
            setAllowed(false);
            return;
        }
        for (const permissionValue of permissionValues) {
            if (!permissionValue) {
                setAllowed(false);
                return;
            }
        }
        setAllowed(true);
    }, [permissionValues, staff]);

    return (
        isAllowed
            ? <Route {...rest}>{children}</Route>
            : null
    );
};

export default ProtectedRoute;
