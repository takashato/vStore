import React, {useEffect, useState} from 'react';
import {EditOutlined, UserAddOutlined} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {Button, Checkbox, Form, Input, message, Modal, PageHeader, Select, Table, Tag, Tooltip,} from 'antd';
import {Route, useParams, useHistory} from 'react-router-dom';
import axios from "../../libs/axios";
import momentTz, {convertDatetimeFormat} from "../../libs/moment";
import {useApolloClient} from "@apollo/react-hooks";
import {GET_STAFF_QUERY, STAFF_LIST_QUERY} from "../../graphql/query";
import {CREATE_UPDATE_STAFF_MUTATION} from "../../graphql/mutation";
import {processGraphqlError} from "../../libs/process_graphql_error";
import {GraphQLError} from "graphql";

const userGroupIDMap = [
    {
        text: 'Nhân viên',
        value: 3,
        color: 'blue',
    }, {
        text: 'Quản lý',
        value: 2,
        color: 'green',
    }, {
        text: 'Quản trị viên',
        value: 1,
        color: 'red',
    }
];

const StaffPageHook = (props) => {
    const client = useApolloClient();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

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
            dataIndex: 'actions',
            fixed: 'right',
            render: (text, record) =>
                data.length >= 1 ? (
                    <>
                        <Tooltip title="Sửa" placement="bottom">
                            <Button icon={<EditOutlined/>} onClick={() => handleEdit(record.id)}/>
                        </Tooltip>
                    </>
                ) : null,
        }
    ];

    // Events
    const getData = async (variables = {limit: 2, offset: 0}, newPagination = pagination) => {
        setLoading(true);
        try {
            let {data} = await client.query({
                query: STAFF_LIST_QUERY,
                variables,
            });
            newPagination.total = data.staffs_offset.count;
            setPagination(newPagination);
            setData(data.staffs_offset.rows);
            setLoading(false);
        } catch (err) {
            message.error('Lỗi khi lấy dữ liệu!');
            console.log(err);
        }
    };

    const handleTableChange = (newPagination, filters, sorter) => {
        getData({
            limit: newPagination.pageSize,
            offset: newPagination.pageSize * (newPagination.current - 1),
            ...filters,
        }, newPagination);
    };

    const handleAddStaffButton = (e) => {
        history.push('/staff/new');
    };

    const handleEdit = (id) => {
        history.push(`/staff/${id}`);
    };

    const handleReload = () => {
        console.log("Reload!!!");
        getData({
            limit: pagination.pageSize,
            offset: pagination.pageSize * (pagination.current - 1),
        });
    };

    useEffect(() => {
        getData({
            limit: pagination.pageSize,
            offset: pagination.pageSize * (pagination.current - 1),
        });
    }, []);

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
                <Table columns={columns} rowKey={record => record.id} loading={loading}
                       dataSource={data} onChange={handleTableChange}
                       pagination={pagination}
                       scroll={{x: true}} size="small"
                       title={() => (
                           <Button onClick={handleAddStaffButton} icon={<UserAddOutlined/>}>Thêm nhân viên</Button>
                       )}
                />
            </div>
            <Route path="/staff/:id">
                <StaffModalHook reload={handleReload}/>
            </Route>
            {/*<StaffModal wrappedComponentRef={this.setFormRef}*/}
            {/*            isCreate={isCreateModal}*/}
            {/*            props={{*/}
            {/*                visible: modalVisible,*/}
            {/*                title: "Nhân viên",*/}
            {/*                onCancel: this.cancelModal,*/}
            {/*                onOk: this.handleSubmit,*/}
            {/*            }}*/}
            {/*            data={modalData}*/}
            {/*/>*/}
        </div>
    );
};

const StaffModalHook = ({reload}) => {
    const client = useApolloClient();
    const history = useHistory();

    const [form] = Form.useForm();

    const {id} = useParams();
    const [isCreate, setCreate] = useState(id === "new");
    const [isVisible, setVisible] = useState(false);
    const [title, setTitle] = useState("Thêm nhân viên");

    const getData = async (id) => {
        message.loading('Đang tải dữ liệu...');
        try {
            const {data} = await client.query({
                query: GET_STAFF_QUERY,
                variables: {
                    id: id,
                }
            });
            console.log(data);
            // Put to state
            await form.setFieldsValue(data.staff);
            await setVisible(true);
            await setTitle(`Sửa nhân viên ${data.staff.username}`);
            message.destroy();
        } catch (err) {
            message.error("Không thể lấy thông tin nhân viên!");
            console.log(err);
        }
    };

    const handleCancel = () => {
        history.push('/staff');
    };

    const handleOk = async () => {
        try {
            const values = form.getFieldsValue();
            values.active = !values.active ? 0 : 1;
            const {data} = await client.mutate({
                mutation: CREATE_UPDATE_STAFF_MUTATION,
                variables: {
                    staff: values
                }
            });
            message.success("Lưu thông tin nhân viên thành công");
            reload();
            history.push('/staff');
        } catch (error) {
            console.log(error.extensions);
            processGraphqlError(error, form);
            console.log(error);
        }
    };

    useEffect(() => {
        form.resetFields();
        if (id !== 'new') {
            getData(id);
            return;
        }
        setVisible(true);
    }, [id]);

    return (
        <Modal
            title={title}
            visible={isVisible}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            <Form
                layout="vertical"
                form={form}
            >
                <Form.Item
                    name="id"
                    noStyle
                >
                    <Input type="hidden"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Tên đăng nhập"
                    rules={[{required: true, message: 'Vui lòng nhập tên đăng nhập.'}]}
                >
                    <Input disabled={!isCreate}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={isCreate ? [{required: true, message: 'Vui lòng nhập mật khẩu.'}] : []}
                >
                    <Input.Password autocomplete="new-password"/>
                </Form.Item>
                <Form.Item
                    name="full_name"
                    label="Họ tên"
                    rules={[{required: true, message: 'Vui lòng nhập họ tên.'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{type: 'email', message: 'Vui lòng nhập email hợp lệ. VD: admin@gmail.com'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="group_id"
                    label="Loại tài khoản"
                    rules={[{required: true, message: 'Vui lòng chọn loại tài khoản.'}]}
                >
                    <Select placeholder="Chọn loại tài khoản">
                        {userGroupIDMap.map((ele) => (
                            <Select.Option value={ele.value} key={ele.value}>{ele.text}</Select.Option>))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="active"
                    valuePropName="checked"
                    rules={[{type: "boolean", message: 'Giá trị không hợp lệ.'}]}
                >
                    <Checkbox>Kích hoạt tài khoản</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default StaffPageHook;
