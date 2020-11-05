import {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {permissionState} from "../../states/recoil/atoms/permission";
import PermissionService from "../../services/PermissionService";

const usePermission = (key, forceRefetch = false) => {
    const [result, setResult] = useState(false);
    const [permissions, setPermissions] = useRecoilState(permissionState);
    const permission = permissions[key];

    useEffect(() => {
        if (permissions[key] !== undefined && !forceRefetch) {
            setResult(permissions[key]);
            return;
        }
        let fetchedData = false;
        try {
            const {data} = PermissionService.getPermission(key);
            fetchedData = !!data.hasPermission;
        } catch (err) {
            //
        }
        setPermissions({...permissions, [key]: fetchedData});
    }, [key, permission, forceRefetch]);

    return result;
};

export default usePermission;
