import {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {permissionState} from "../../states/recoil/atoms/permission";
import PermissionService from "../../services/PermissionService";

const usePermission = (keyList, forceRefetch = false) => {
    if (!Array.isArray(keyList)) keyList = [keyList];

    const [result, setResult] = useState(null);
    const [permissions, setPermissions] = useRecoilState(permissionState);

    // did mount
    useEffect(() => {
        let newResult;
        if (result === null || forceRefetch) {
            try {
                const {data} = PermissionService.getPermission(keyList)
                newResult = {...result, ...data};
            } catch (err) {
                for (const key of keyList) { // Init default
                    newResult[key] = false;
                }
            }
        }
        setResult(newResult);
    }, [keyList, forceRefetch]);

    const returnObjValues = Object.values(result);
    if (returnObjValues <= 1)
        return returnObjValues[0]; // as single
    return result;
};

export default usePermission;
