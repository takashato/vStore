import React from 'react';
import {
    Table,
    message,
    PageHeader,
    Tag,
    Modal,
    Button,
    Popconfirm,
    Icon,
    Tooltip,
    Form,
    Input,
    Select,
    Divider
} from 'antd';
import axios from "../../libs/axios";
import {connect} from "react-redux";
import moment from "moment";
import momentTz from "../../libs/moment";

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

class StaffPage extends React.Component {
    state = {
        loading: false,
        data: [],
        pagination: {},
        modalVisible: false,
        modalData: {},
        isCreateModal: false,
    };

    constructor(props) {
        super(props);

        this.columns = [
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
                render: data => momentTz(data).format('HH:mm:ss DD/MM/YYYY'),
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
            }
        ];
        this.fields = this.columns.map(value => value.dataIndex);

        // Push non-persistent cols
        this.columns.push({
            title: 'Hành động',
            dataIndex: 'actions',
            fixed: 'right',
            render: (text, record) =>
                this.state.data.length >= 1 ? (
                    <>
                        <Tooltip title="Sửa" placement="bottom">
                            <Button icon="edit" onClick={() => this.handleEdit(record.id)}/>
                        </Tooltip>
                    </>
                ) : null,
        });
    }

    async getData(params = {}) {
        this.setState({loading: true});
        try {
            let res = await axios.get('/staff', {
                params: {
                    results: 10,
                    fields: this.fields.join(','),
                    ...params
                }
            });
            let pagination = {...this.state.pagination};
            pagination.total = res.data.total;
            this.setState({data: res.data.rows, loading: false, pagination});
        } catch (err) {
            message.error(err.response ? err.response.data.userMessage : 'Lỗi lấy dữ liệu!');
            console.log(err);
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({pagination: pager});
        this.getData({
            results: pagination.pageSize,
            page: pagination.current,
            ...filters,
        });
    };

    handleAddStaffButton = (e) => {
        this.setState({
            modalVisible: true, isCreateModal: true, modalData: {
                username: '',
                password: '',
                full_name: '',
                email: '',
                group_id: undefined,
            }
        });
        this.formRef.props.form.resetFields();
    };

    handleEdit = async (id) => {
        let res;
        try {
            res = await axios.get('/staff/' + id, {params: {fields: this.fields.join(',')}});
        } catch (err) {
            message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : "Lỗi khi lấy thông tin nhân viên.");
            return;
        }
        this.setState({
            modalVisible: true, isCreateModal: false, modalData: {
                id: id,
                username: res.data.username,
                password: res.data.password,
                full_name: res.data.full_name,
                email: res.data.email,
                group_id: res.data.group_id,
            }
        });
    };

    setFormRef = formRef => this.formRef = formRef;

    cancelModal = () => {
        this.setState({modalVisible: false});
    };

    handleSubmit = () => {
        const {form} = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            if (!this.state.modalData.id) { // Add new
                axios.post("/staff", values)
                    .then((response) => {
                        message.success("Tạo nhân viên thành công.");
                        this.setState({modalVisible: false});
                        form.resetFields();
                        this.getData();
                    })
                    .catch((err) => {
                        message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : "Lỗi khi tạo nhân viên mới.");
                    });
            } else {
                axios.put("/staff/" + this.state.modalData.id, values)
                    .then((response) => {
                        message.success("Cập nhật thông tin nhân viên thành công.");
                        this.setState({modalVisible: false});
                        form.resetFields();
                        this.getData();
                    })
                    .catch((err) => {
                        message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : "Lỗi khi cập nhật thông tin nhân viên.");
                    });
            }
        });
    };

    componentDidMount() {
        if (this.props.staff.token) {
            this.getData();
        }
    }

    render() {
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
                    <Button onClick={this.handleAddStaffButton} icon="user-add">Thêm nhân viên</Button>
                    <Table columns={this.columns} rowKey={record => record.id} loading={this.state.loading}
                           dataSource={this.state.data} onChange={this.handleTableChange}
                           pagination={this.state.pagination}
                           scroll={{x: true}}
                    />
                </div>
                <StaffModal wrappedComponentRef={this.setFormRef}
                            isCreate={this.state.isCreateModal}
                            props={{
                                visible: this.state.modalVisible,
                                title: "Nhân viên",
                                onCancel: this.cancelModal,
                                onOk: this.handleSubmit,
                            }}
                            data={this.state.modalData}
                />
            </div>
        );
    }
}


const StaffModal = Form.create({name: 'staff_modal'})(
    class extends React.Component {
        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Modal {...this.props.props}>
                    <Form>
                        <Form.Item label="Tên đăng nhập">
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Vui lòng nhập tên đăng nhập.'}],
                                initialValue: this.props.data.username
                            })(<Input disabled={!this.props.isCreate}/>)}
                        </Form.Item>
                        <Form.Item label="Mật khẩu">
                            {getFieldDecorator('password', this.props.isCreate ? {
                                rules: [{required: true, message: 'Vui lòng nhập mật khẩu.'}],
                            } : {})(<Input.Password/>)}
                        </Form.Item>
                        <Form.Item label="Họ tên">
                            {getFieldDecorator('full_name', {
                                rules: [{required: true, message: 'Vui lòng nhập họ tên.'}],
                                initialValue: this.props.data.full_name,
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                rules: [{type: 'email', message: 'Vui lòng nhập email hợp lệ. VD: admin@gmail.com'}],
                                initialValue: this.props.data.email,
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Loại tài khoản">
                            {getFieldDecorator('group_id', {
                                rules: [{required: true, message: 'Vui lòng chọn loại tài khoản.'}],
                                initialValue: this.props.data.group_id,
                            })(<Select placeholder="Chọn loại tài khoản">
                                {userGroupIDMap.map((ele) => (
                                    <Select.Option value={ele.value} key={ele.value}>{ele.text}</Select.Option>))}
                            </Select>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = state => {
    return {
        staff: state.staff,
    };
};

export default connect(mapStateToProps)(StaffPage);