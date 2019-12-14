import React from "react";
import {connect} from "react-redux";
import {Button, Form, Input, message, Modal, PageHeader, Table, Tag, Tooltip} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";
import {number_format} from "../../libs/number_formater";

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
                render: (data) => momentTz(data).format('DD/MM/YYYY'),
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
                                       <Button icon="plus" onClick={this.handleAddButton}>Thêm khách hàng</Button>
                                   </Form.Item>
                                   <Form.Item>
                                       <Input.Search placeholder="Tìm kiếm khách hàng..." onSearch={this.handleSearch}/>
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

export default connect(mapStateToProps)(CustomerPage);