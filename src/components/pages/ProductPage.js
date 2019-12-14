import React from "react";
import {connect} from "react-redux";
import {Button, Form, Input, InputNumber, message, Modal, PageHeader, Select, Switch, Table, Tag, Tooltip} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";
import {number_format} from "../../libs/number_formater";
import CategorySelector from "../forms/CategorySelector";
import InputFormatedNumnber from "../forms/InputFormatedNumber";
import {Checkbox} from "antd/es";

class ProductPage extends React.Component {

    state = {
        data: [],
        pagination: {},
        loading: false,
        search: undefined,
        modalVisible: false,
        modalData: {},
        categoryFilter: undefined,
        inventoryFilter: false,
    };

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            }, {
                title: 'Bar code',
                dataIndex: 'bar_code',
            }, {
                title: 'Tên sản phẩm',
                dataIndex: 'name',
            }, {
                title: 'Danh mục',
                dataIndex: 'category',
                render: (data) => data.name,
            }, {
                title: 'Giá',
                dataIndex: 'price',
                render: (data) => number_format(data),
            }, {
                title: 'Hàng tồn kho',
                dataIndex: 'inventory_quantity',
                render: (data) => (data > 0 ? data : <Tag color="red">Hết hàng</Tag>)
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
        if (this.state.categoryFilter) params.category_id = this.state.categoryFilter.key;
        if (this.state.inventoryFilter) params.inventory = this.state.inventoryFilter;
        try {
            let res = await axios.get('/product', {
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

    handleEditButton = (id) => {
        const hideMsg = message.loading('Đang lấy dữ liệu...');
        axios.get('/product/' + id, {
            params: {
                fields: ['id', 'bar_code', 'name', 'category', 'price', 'original_price'].join(',')
            }
        }).then(res => {
            this.formRef.props.form.resetFields();
            this.setState({
                modalVisible: true,
                modalData: {
                    ...res.data,
                    category_id: {
                        key: res.data.category.id,
                        label: res.data.category.name,
                    }
                }
            });
            hideMsg();
        }).catch(err => {
            hideMsg();
            message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu sản phẩm.');
        });
    };

    handleSearch = (value) => {
        this.getData({search: value});
    };

    handleAddButton = (e) => {
        this.formRef.props.form.resetFields();
        this.setState({modalVisible: true, modalData: {}});
    };

    handleCancel = () => {
        this.formRef.props.form.resetFields();
        this.setState({modalVisible: false});
    };

    handleSubmit = () => {
        this.formRef.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            if (!this.state.modalData.id) { // Add new
                axios.post('/product', {
                    ...values,
                    category_id: values.category_id.key,
                }).then(res => {
                    message.success('Thêm sản phẩm thành công!');
                    this.setState({modalVisible: false, modalData: {}});
                    this.getData();
                }).catch(err => {
                    message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi thêm sản phẩm.');
                });
                return;
            }
            // Update
            axios.put('/product/' + this.state.modalData.id, {
                ...values,
                category_id: values.category_id.key
            }).then(res => {
                message.success('Cập nhật sản phẩm thành công!');
                this.setState({modalVisible: false, modalData: {}});
                this.getData();
            }).catch(err => {
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi cập nhật sản phẩm.');
            });
        });
    };

    handleCategoryChange = async value => {
        await this.setState({categoryFilter: value});
        await this.getData();
    };

    handleInventoryChange = async e => {
        await this.setState({inventoryFilter: e.target.checked});
        await this.getData();
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
                    title="Danh sách sản phẩm"
                    subTitle="Quản lý danh sách sản phẩm"
                />
                <div className="container">
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.data} loading={this.state.loading}
                           onChange={this.handleTableChange} pagination={this.state.pagination} size="small"
                           scroll={{x: true}}
                           title={() => (
                               <Form layout="inline">
                                   <Form.Item>
                                       <Button icon="plus" onClick={this.handleAddButton}>Thêm sản phẩm</Button>
                                   </Form.Item>
                                   <Form.Item>
                                       <Input.Search placeholder="Tìm kiếm sản phẩm..." allowClear
                                                     onSearch={this.handleSearch}/>
                                   </Form.Item>
                                   <Form.Item>
                                       <CategorySelector allowClear onChange={this.handleCategoryChange}
                                                         value={this.state.categoryFilter} style={{width: 200}}/>
                                   </Form.Item>
                                   <Form.Item>
                                       <Checkbox onChange={this.handleInventoryChange} defaultChecked={this.state.inventoryFilter}>Chỉ sản phẩm hết hàng</Checkbox>
                                   </Form.Item>
                               </Form>
                           )}/>
                    <ProductModal wrappedComponentRef={(ref) => this.formRef = ref} props={{
                        title: "Sản phẩm",
                        visible: this.state.modalVisible,
                        onCancel: this.handleCancel,
                        onOk: this.handleSubmit,
                    }} data={this.state.modalData}/>
                </div>
            </div>
        );
    }
}

const ProductModal = Form.create({name: 'product_modal'})(
    class extends React.Component {
        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Modal {...this.props.props}>
                    <Form>
                        <Form.Item label="Bar code">
                            {getFieldDecorator('bar_code', {
                                rules: [{required: true, message: "Vui lòng nhập Bar Code."}],
                                initialValue: this.props.data.bar_code,
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Tên sản phẩm">
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: "Vui lòng nhập tên sản phẩm."}],
                                initialValue: this.props.data.name
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="Danh mục">
                            {getFieldDecorator('category_id', {
                                rules: [{required: true, message: "Vui lòng chọn danh mục."}],
                                initialValue: this.props.data.category_id,
                            })(<CategorySelector/>)}
                        </Form.Item>
                        <Form.Item label="Giá sản phẩm">
                            {getFieldDecorator('price', {
                                rules: [{required: true, message: "Vui lòng nhập giá sản phẩm."}],
                                initialValue: this.props.data.price,
                            })(<InputFormatedNumnber placeholder="Giá tính thành tiền"/>)}
                        </Form.Item>
                        <Form.Item label="Giá gốc sản phẩm">
                            {getFieldDecorator('original_price', {
                                initialValue: this.props.data.original_price
                            })(<InputFormatedNumnber placeholder="Giá gốc chưa khuyến mãi, có thể bỏ trống"/>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        };
    }
);

const mapStateToProps = (state) => {
    return {
        staff: state.staff,
    }
};

export default connect(mapStateToProps)(ProductPage);