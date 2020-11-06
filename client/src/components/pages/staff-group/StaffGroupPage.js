import React, {useEffect, useState} from 'react';
import {Card, message, PageHeader, Select, Tree} from "antd";
import PermissionService from "../../../services/PermissionService";

const StaffGroupPageContainer = () => {
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        try {
            const {data} = await PermissionService.getGroups();
            setGroups([...data]);
        } catch (err) {
            message.error("Không thể lấy thông tin nhóm quyền nhân viên.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <StaffGroupPage dataSource={groups}/>
    )
};

const StaffGroupPage = ({dataSource}) => {
    const [groupId, setGroupId] = useState(null);

    const handleChange = (value) => {
        setGroupId(value);
    };

    return (
        <div>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="Nhóm nhân viên"
                subTitle="Quản lý nhóm quyền nhân viên"
            />
            <div className="container">
                <Select onChange={handleChange} style={{width: '100%'}} placeholder="Chọn nhóm nhân viên...">
                    {dataSource.map((group) => (
                        // <Collapse.Panel header={group.name} key={group.id}>
                        //     <StaffGroupPermissionTree groupId={group.id}/>
                        // </Collapse.Panel>
                        <Select.Option value={group.id}>{group.name}</Select.Option>
                    ))}
                </Select>
                <Card>
                    {groupId ? <StaffGroupPermissionTree groupId={groupId}/> : null}
                </Card>
            </div>
        </div>
    );
};

const StaffGroupPermissionTree = ({groupId}) => {
    const [permissions, setPermissions] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const {data} = await PermissionService.getGroup({groupId});
                setPermissions({...data});
            } catch (err) {
                //
            }
        })();
    }, [])

    const entries = Object.entries(permissions);
    const checkedKeys = [];

    for (const entry of entries) {
        if (entry[1].value) checkedKeys.push(entry[0]);
    }

    if (entries.length <= 0) return null;

    return (
        <Tree checkable defaultCheckedKeys={checkedKeys} treeData={entries.map(entry => {
            return {
                title: entry[1].name,
                key: entry[0],
            };
        })}/>
    );
};

export default StaffGroupPageContainer;
