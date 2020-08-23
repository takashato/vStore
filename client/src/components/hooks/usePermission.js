import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

const usePermission = (name) => {
    const [result, setResult] = useState(false);
    const permissions = useSelector(state => state.permissions);
    const permission = permissions[name] || false;

    useEffect(() => {
        setResult(permission);
    }, [permission]);

    return result;
};

export default usePermission;
