import {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {permissionSelector} from "../../states/recoil/atoms/permission";
import PermissionService from "../../services/PermissionService";

const usePermission = (keyList, forceRefetch = false) => {
    if (!Array.isArray(keyList)) keyList = [keyList];

    const [result, setResult] = useState(() => {
        const initState = {};
        for (const key of keyList) {
            initState[key] = false;
        }
        return initState;
    });
    const [initialized, setInitialized] = useState(false);
    const [permissions, setPermissions] = useRecoilState(permissionSelector);

    // did mount
    useEffect(() => {
        (async () => {
            if (!initialized || forceRefetch) {
                setInitialized(true);
                try {
                    const {data} = await PermissionService.getPermission(keyList)
                    setPermissions(data);
                } catch (err) {
                    // Default
                }
            }
        })();
    }, [initialized, permissions, keyList, forceRefetch]);

    useEffect(() => {
        let newResult = {};
        for (const key of keyList) {
            newResult[key] = permissions[key];
        }
        setResult(newResult);
    }, [keyList, permissions]);

    const returnObjValues = Object.values(result);
    if (returnObjValues <= 1)
        return returnObjValues[0]; // as single
    return result;
};

export default usePermission;
