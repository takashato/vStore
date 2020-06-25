import React from 'react';
import {EditOutlined, PlusOutlined} from '@ant-design/icons';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, Input, message, Modal, PageHeader, Table, Tooltip} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";
import {connect} from "react-redux";

class CategoryPage extends React.Component {
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
                title: 'Tên danh mục',
                dataIndex: 'name',
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
                this.props.staff.staff.permissions && this.props.staff.staff.permissions.product.write ?
                    <Tooltip title="Sửa" placement="bottom">
                        <Button icon={<EditOutlined/>} onClick={() => this.handleEditButton(record.id)}/>
                    </Tooltip> : null
            )
        });
    }

    async getData(params = {}) {
        if (params.search === '') params.search = undefined;
        this.setState({loading: true, search: params.search});
        try {
            let res = await axios.get('/category', {
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

    handleSearch = (value) => {
        this.getData({search: value});
    };

    handleAddButton = (e) => {
        this.setState({modalVisible: true, modalData: {}});
        this.formRef.props.form.resetFields();
    };

    handleEditButton = (id) => {
        axios.get('/category/' + id, {params: {fields: this.fields.join(',')}})
            .then((res) => {
                this.setState({modalVisible: true, modalData: res.data});
                this.formRef.props.form.resetFields();
            })
            .catch((err) => {
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
            });
    };

    handleSubmit = async () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            if (!this.state.modalData.id) { // Create
                axios.post('/category', {name: values.name})
                    .then((res) => {
                        message.success('Tạo danh mục thành công!');
                        this.setState({modalVisible: false, modalData: {}});
                        this.getData();
                    })
                    .catch((err) => {
                        message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi tạo danh mục.');
                    });
                return;
            }
            // Update
            axios.put('/category/' + this.state.modalData.id, {name: values.name})
                .then((res) => {
                    message.success('Cập nhật danh mục thành công!');
                    this.setState({modalVisible: false, modalData: {}});
                    this.getData();
                })
                .catch((err) => {
                    message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi cập nhật mục.');
                });
        });
    };

    componentDidMount() {
        if (this.props.staff.token) {
            this.getData();
        }
    }

    render() {
        if (!this.props.staff.staff) return null;
        const {permissions} = this.props.staff.staff;
        if (!permissions) return null;
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Danh mục sản phẩm"
                    subTitle="Quản lý danh mục sản phẩm"
                />
                <div className="container">
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.data} loading={this.state.loading}
                           onChange={this.handleTableChange} pagination={this.state.pagination} size="small"
                           scroll={{x: true}}
                           title={() => (
                               <Form layout="inline">
                                   {permissions.product.write ?
                                       <Form.Item>
                                           <Button icon={<PlusOutlined/>} onClick={this.handleAddButton}>Thêm danh
                                               mục</Button>
                                       </Form.Item> : null}
                                   <Form.Item>
                                       <Input.Search placeholder="Tìm kiếm danh mục..." allowClear
                                                     onSearch={this.handleSearch}/>
                                   </Form.Item>
                               </Form>
                           )}/>
                </div>
                <AddCategoryModal wrappedComponentRef={(formRef) => this.formRef = formRef}
                                  props={{
                                      title: 'Danh mục',
                                      visible: this.state.modalVisible,
                                      onCancel: () => this.setState({modalVisible: false, modalData: {}}),
                                      onOk: this.handleSubmit,
                                  }} data={this.state.modalData}/>
            </div>
        );
    }
}

const AddCategoryModal = Form.create({name: 'category_modal'})(
    class extends React.Component {
        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Modal {...this.props.props}>
                    <Form>
                        <Form.Item label="Tên danh mục">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: 'Vui lòng nhập tên danh mục.'}],
                                initialValue: this.props.data.name,
                            })(<Input/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = (state) => {
    return {
        staff: state.staff,
    }
};

export default connect(mapStateToProps)(CategoryPage);
