import usePermission from "../hooks/usePermission";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";

const ProtectedArea = ({permissions = [], children, fallback, ...rest}) => {
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

    if (!isAllowed) return fallback ? fallback() : null;
    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {...rest});
        }
        return child;
    });
};

export default ProtectedArea;
