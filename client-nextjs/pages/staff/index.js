import {Button, PageHeader, Table} from "antd";
import {convertDatetimeFormat} from "../../utils/moment";

const StaffContainer = () => {
    return (<Staff/>)
};

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

const Staff = ({tableLoading, tableDataSource, onTableChange, tablePagination, onClickAddButton, onEdit: handleEdit}) => {
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
        </div>
    )
};

export default StaffContainer;
