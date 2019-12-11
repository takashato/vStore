import React from 'react';
import {message, PageHeader, Table} from "antd";
import axios from "../../libs/axios";
import momentTz from "../../libs/moment";

class CategoryPage extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
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
        });
    }

    async getData(params = {}) {
        this.setState({loading: true});
        try {
            let res = await axios.get('/category', {
                params: {
                    results: 10,
                    fields: this.fields.join(','),
                    ...params
                }
            });
            let pagination = {...this.state.pagination};
            pagination.total = res.total || 0;
            this.setState({data: res.data.rows, pagination});
        } catch (err) {
            message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
        }
        this.setState({loading: false});
    }

    componentDidMount() {
        this.getData();
    }

    render() {
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
                    <Table columns={this.columns} dataSource={this.state.data} loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}

export default CategoryPage;