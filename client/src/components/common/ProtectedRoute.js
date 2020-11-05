import React, {useEffect, useState} from 'react';
import usePermission from "../hooks/usePermission";
import {useSelector} from "react-redux";
import {Route} from "react-router-dom";

const ProtectedRoute = ({permissions = [], children, fallback, ...rest}) => {
    const permissionValues = usePermission(permissions);
    const staff = useSelector(state => state.staff)
    const [isAllowed, setAllowed] = useState(false);

    useEffect(() => {
        if (!staff) {
            setAllowed(false);
            return;
        }

        const values = Object.values(permissionValues || {});

        if (values.length <= 0) {
            setAllowed(false);
            return;
        }

        for (const permissionValue of values) {
            if (!permissionValue) {
                setAllowed(false);
                return;
            }
        }
        setAllowed(true);
    }, [permissionValues, staff]);

    console.log('protected route ', isAllowed, ' data ', rest);
    console.log(permissions, ' => ', permissionValues);

    return (
        isAllowed
            ? <Route {...rest}>{children}</Route>
            : (fallback ? fallback() : null)
    );
};

export default ProtectedRoute;
