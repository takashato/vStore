import {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {permissionSelector} from "../../states/recoil/atoms/permission";

const usePermission = (keyList) => {
    if (!Array.isArray(keyList)) keyList = [keyList];

    const [result, setResult] = useState(() => {
        const initState = {};
        for (const key of keyList) {
            initState[key] = false;
        }
        return initState;
    });
    const permissions = useRecoilValue(permissionSelector);

    const setResultByKeyList = (data) => {
        const toSet = {};
        for (const key of keyList) {
            toSet[key] = data.hasOwnProperty(key) ? data[key] : false;
        }
        setResult(toSet);
    }

    // did mount
    useEffect(() => {
        setResultByKeyList({...permissions})
    }, []);

    const returnObjValues = Object.values(result);
    if (returnObjValues <= 1)
        return returnObjValues[0]; // as single
    return result;
};

export default usePermission;
