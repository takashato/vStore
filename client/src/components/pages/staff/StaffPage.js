import React, {useState} from 'react';
import {EditOutlined, UserAddOutlined} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {Button, message, PageHeader, Table, Tag, Tooltip,} from 'antd';
import {Route, useHistory} from 'react-router-dom';
import {convertDatetimeFormat} from "../../../libs/moment";
import {useQuery} from "@apollo/react-hooks";
import {STAFF_LIST_QUERY} from "../../../graphql/query";
import {userGroupIDMap} from "../../../constants/userGroupIDMap";
import StaffModal from "./StaffModal";
import usePermission from "../../hooks/usePermission";

const StaffPageHook = (props) => {
    const history = useHistory();

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    const {loading, error, data, refetch} = useQuery(STAFF_LIST_QUERY, {
        variables: {
            limit: pagination.pageSize,
            offset: pagination.pageSize * (pagination.current - 1),
        },
        onCompleted: (data) => {
            if (data && data.staffs_offset) {
                const newPagination = {...pagination, total: data.staffs_offset.count};
                setPagination(newPagination);
            }
        },
        onError: err => {
            message.error('Lỗi khi lấy dữ liệu.')
        },
    });

    const handleTableChange = (newPagination, filters, sorter) => {
        setPagination(newPagination);
        refetch({
            variables: {
                limit: newPagination.pageSize,
                offset: newPagination.pageSize * (newPagination.current - 1),
            }
        });
    };

    const handleAddStaffButton = (e) => {
        history.push('/staff/new');
    };

    const handleEdit = (id) => {
        history.push(`/staff/${id}`);
    };

    const handleReload = () => {
        refetch({
            limit: pagination.pageSize,
            offset: pagination.pageSize * (pagination.current - 1),
        });
    };

    const exportedData = (data && data.staffs_offset) ? data.staffs_offset.rows : null;

    return (
        <StaffPageComponent
            tableLoading={loading}
            tableDataSource={exportedData}
            onTableChange={handleTableChange}
            tablePagination={pagination}
            onClickAddButton={handleAddStaffButton}
            onEdit={handleEdit}
        />
    );
};

const StaffPageComponent = ({tableLoading, tableDataSource, onTableChange, tablePagination, onClickAddButton, onEdit: handleEdit}) => {
    // Columns processing
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        }, {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
        }, {
            title: 'Họ tên',
            dataIndex: 'full_name',
        }, {
            title: 'Email',
            dataIndex: 'email',
        }, {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            render: data => convertDatetimeFormat(data),
        }, {
            title: 'Loại tài khoản',
            dataIndex: 'group_id',
            filters: userGroupIDMap,
            render: value => {
                const group = userGroupIDMap.find(ele => ele.value === value);
                if (group) {
                    return (<Tag color={group.color}>{group.text}</Tag>);
                }
                return null;
            }
        }, {
            title: 'Trạng thái',
            dataIndex: 'active',
            render: value => {
                return (value === 1 ? <Tag color="green">Hoạt động</Tag> : <Tag color="red">Ngưng hoạt động</Tag>);
            }
        },
        {
            title: 'Hành động',
            fixed: 'right',
            render: (text, record) =>
                (
                    <>
                        <Tooltip title="Sửa" placement="bottom">
                            <Button icon={<EditOutlined/>} onClick={() => handleEdit(record.id)}/>
                        </Tooltip>
                    </>
                ),
        }
    ];

    return (
        <div>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="Nhân viên"
                subTitle="Quản lý nhân viên"
            />
            <div className="container">
                <Table columns={columns} rowKey={record => record.id} loading={tableLoading}
                       dataSource={tableDataSource} onChange={onTableChange}
                       pagination={tablePagination}
                       scroll={{x: true}} size="small"
                       title={() => (
                           <Button onClick={onClickAddButton} icon={<UserAddOutlined/>}>Thêm nhân viên</Button>
                       )}
                />
            </div>
            <Route path="/staff/:id">
                <StaffModal/>
            </Route>
        </div>
    )
};

export default StaffPageHook;
