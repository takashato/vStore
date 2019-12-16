import React from 'react';
import {connect} from "react-redux";
import axios from "../../libs/axios";
import {Button, Form, Input, message, PageHeader, Table} from "antd";
import CategorySelector from "../forms/CategorySelector";
import {Checkbox} from "antd/es";

class ReportPage extends React.Component{

    state = {
        data: [],
        pagination: {},
        loading: false,
        search: undefined,
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
                title: 'Tên sản phẩm',
                dataIndex: 'name',
            }, {
                title: 'Danh mục',
                dataIndex: 'category',
                render: (data) => data.name
            }, {
                title: 'Hàng tồn kho',
                dataIndex: 'inventory_quantity',
            }
        ];
        this.fields = this.columns.map(e => e.dataIndex);
    }

    async getData(params = {}) {

        if (params.search === '') params.search = undefined;

        this.setState({loading: true, search: params.search});
        if (this.state.categoryFilter) params.category_id = this.state.categoryFilter.key;
        if (this.state.inventoryFilter) params.inventory = this.state.inventoryFilter;
        try {
            let res = await axios.get('/report', {
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
    };

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
                    title="Báo cáo"
                    subTitle="Báo cáo và kiểm kho"
                />
                <div className="container">
                    <Table columns={this.columns} rowKey="id" dataSource={this.state.data} loading={this.state.loading}
                           onChange={this.handleTableChange} pagination={this.state.pagination} size="small"
                           scroll={{x: true}}
                           title={() => (
                               <Form layout="inline">
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
                                   <Form.Item style={{ float: "right" }}>
                                       <Button icon="printer" onClick={this.handleAddButton}>In Báo Cáo</Button>
                                   </Form.Item>
                               </Form>
                           )}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff,
    };
};

export default connect(mapStateToProps)(ReportPage);