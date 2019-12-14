import React from "react";
import {connect} from "react-redux";
import {Button, Form, Input, message, Modal, PageHeader, Select, Table, Tag, Tooltip, DatePicker} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";
import moment from 'moment';

class CustomerPage extends React.Component {

    state = {
        data: [],
        pagination: {},
        loading: false,
        search: undefined,
        modalVisible: false,
        modalData: {},
    };

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            }, {
                title: 'Tên khách hàng',
                dataIndex: 'full_name',
            }, {
                title: 'Số điện thoại',
                dataIndex: 'phone_number',
            }, {
                title: 'Ngày sinh',
                dataIndex: 'birthday',
                render: (data) => moment(data).format('DD/MM/YYYY'),
            }, {
                title: 'Ngày tạo',
                dataIndex: 'created_at',
                render: (data) => momentTz(data).format('HH:mm:ss DD/MM/YYYY'),
            },
        ];

        this.fields = this.columns.map(e => e.dataIndex);
        this.columns.push({
            title: 'Hành động',
            fixed: 'right',
            render: (text, record) => (
                <Tooltip title="Sửa" placement="bottom">
                    <Button icon="edit" onClick={() => this.handleEditButton(record.id)}/>
                </Tooltip>
            )
        });
    }

    async getData(params = {}) {
        if (params.search === '') params.search = undefined;
        this.setState({loading: true, search: params.search});
        try {
            let res = await axios.get('/customer', {
                params: {
                    results: 10,
                    fields: this.fields.join(','),
                    ...params
                }
            });
            let pagination = {...this.state.pagination};
            pagination.total = res.data.total || 0;
            this.setState({data: res.data.rows, pagination});
        } catch (err) {
            message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
        }
        this.setState({loading: false});
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

    handleAddCustomerButton = (e) => {
        this.setState({
            modalVisible: true, isCreateModal: true, modalData: {
                full_name: '',
                phone_number: '',
                birthday: moment('01/01/2001', 'DD/MM/YYYY'),
            }
        });
        this.formRef.props.form.resetFields();
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
                axios.post("/customer", values)
                    .then((response) => {
                        message.success("Tạo khách hàng thành công.");
                        this.setState({modalVisible: false});
                        form.resetFields();
                        this.getData();
                    })
                    .catch((err) => {
                        message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : "Lỗi khi tạo khách hàng mới.");
                    });
            }
            // else {
            //     axios.put("/staff/" + this.state.modalData.id, values)
            //         .then((response) => {
            //             message.success("Cập nhật thông tin nhân viên thành công.");
            //             this.setState({modalVisible: false});
            //             form.resetFields();
            //             this.getData();
            //         })
            //         .catch((err) => {
            //             message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : "Lỗi khi cập nhật thông tin nhân viên.");
            //         });
            // }
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
                    title="Khách hàng"
                    subTitle="Quản lý khách hàng"
                />
                <div className="container">
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.data} loading={this.state.loading}
                           onChange={this.handleTableChange} pagination={this.state.pagination} size="small"
                           title={() => (
                               <Form layout="inline">
                                   <Form.Item>
                                       <Button icon="plus" onClick={this.handleAddCustomerButton}>Thêm khách hàng</Button>
                                   </Form.Item>
                                   <Form.Item>
                                       <Input.Search placeholder="Tìm kiếm khách hàng..." onSearch={this.handleSearch}/>
                                   </Form.Item>
                               </Form>
                           )}/>
                </div>
                <CustomerModal wrappedComponentRef={this.setFormRef}
                            isCreate={this.state.isCreateModal}
                            props={{
                                visible: this.state.modalVisible,
                                title: "Khách hàng",
                                onCancel: this.cancelModal,
                                onOk: this.handleSubmit,
                            }}
                            data={this.state.modalData}
                />
            </div>
        );
    }
}


const CustomerModal = Form.create({name: 'customer_modal'})(
    class extends React.Component {
        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Modal {...this.props.props}>
                    <Form>
                        <Form.Item label="Họ tên">
                            {getFieldDecorator('full_name', {
                                rules: [{required: true, message: 'Vui lòng nhập họ tên.'}],
                                initialValue: this.props.data.full_name,
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Số điện thoại">
                            {getFieldDecorator('phone_number', {
                                rules: [{required: true, message: 'Vui lòng nhập số điện thoại.'}],
                                initialValue: this.props.data.phone_number,
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Ngày sinh">
                            {getFieldDecorator('birthday', {
                                initialValue: this.props.data.birthday,
                            })(<DatePicker format="DD/MM/YYYY"/>)}
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

export default connect(mapStateToProps)(CustomerPage);