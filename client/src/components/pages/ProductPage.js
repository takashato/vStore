import React from "react";
import {connect} from "react-redux";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Button,
    Input,
    InputNumber,
    message,
    Modal,
    PageHeader,
    Select,
    Table,
    Tag,
    Tooltip,
} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";
import {number_format} from "../../libs/number_formater";
import CategorySelector from "../forms/CategorySelector";
import InputFormatedNumnber from "../forms/InputFormatedNumber";
import {Checkbox} from "antd/es";
import {Route, withRouter, Switch, Link} from "react-router-dom";
import ProductActionPage from "./ProductActionPage";

class ProductPage extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/product">
                        <ProductManager/>
                    </Route>
                    <Route path="/product/update/:id" component={ProductActionPage}/>
                    <Route path="/product/add" component={ProductActionPage}/>
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        staff: state.staff,
    }
};

const ProductManager = connect(mapStateToProps) (
    class extends React.Component {
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
                    this.props.staff.staff.permissions && this.props.staff.staff.permissions.product.write ?
                        <Tooltip title="Sửa" placement="bottom">
                            <Link to={"/product/update/" + record.id}>
                                <Button icon={<EditOutlined />}/>
                            </Link>
                        </Tooltip> : null)
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

        handleSearch = (value) => {
            this.getData({search: value});
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
            if (!this.props.staff.staff) return null;
            const {permissions} = this.props.staff.staff;
            if (!permissions) return null;
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
                                       {permissions.product.write ?
                                           <Form.Item>
                                               <Link to={"/product/add"}>
                                                   <Button icon={<PlusOutlined />}>Thêm sản phẩm</Button>
                                               </Link>
                                           </Form.Item> : null}
                                       <Form.Item>
                                           <Input.Search placeholder="Tìm kiếm sản phẩm..." allowClear
                                                         onSearch={this.handleSearch}/>
                                       </Form.Item>
                                       <Form.Item>
                                           <CategorySelector allowClear onChange={this.handleCategoryChange}
                                                             value={this.state.categoryFilter} style={{width: 200}}/>
                                       </Form.Item>
                                       <Form.Item>
                                           <Checkbox onChange={this.handleInventoryChange}
                                                     defaultChecked={this.state.inventoryFilter}>Chỉ sản phẩm hết
                                               hàng</Checkbox>
                                       </Form.Item>
                                   </Form>
                               )}/>
                        {/*{permissions.product.write ?*/}
                        {/*    <ProductModal wrappedComponentRef={(ref) => this.formRef = ref} props={{*/}
                        {/*        title: "Sản phẩm",*/}
                        {/*        visible: this.state.modalVisible,*/}
                        {/*        onCancel: this.handleCancel,*/}
                        {/*        onOk: this.handleSubmit,*/}
                        {/*    }} data={this.state.modalData}/> : null}*/}
                    </div>
                </div>
            );
        }
    }
);

export default withRouter(ProductPage);