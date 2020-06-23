import * as React from "react";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import axios from "../../libs/axios";
import {connect} from "react-redux";
import {number_format} from "../../libs/number_formater";
import InvoiceDetailPage from "./InvoiceDetailPage";
import {EyeOutlined} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {Button, message, PageHeader, Table, Tooltip, Tag} from "antd";

class InvoicePage extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/invoice">
                        <InvoiceManager/>
                    </Route>
                    <Route path="/invoice/:id" render={InvoiceDetailPage}/>
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        staff: state.staff,
    };
};

const InvoiceManager = connect(mapStateToProps)(
    class extends React.Component {
        state = {
            data: [],
            pagination: {},
            loading: false,
        };

        constructor(props) {
            super(props);

            this.columns = [
                {
                    title: 'Mã hóa đơn',
                    dataIndex: 'id',
                }, {
                    title: 'Tên khách hàng',
                    dataIndex: 'customer',
                    render: (customer) => customer ? customer.full_name : 'Khách vãng lai',
                }, {
                    title: 'Nhân viên',
                    dataIndex: 'staff',
                    render: (staff) => (`${staff.id} - ${staff.username}`)
                }, {
                    title: 'Trả trước',
                    dataIndex: 'prepaid_value'
                }, {
                    title: 'Tổng tiền',
                    dataIndex: 'total_value',
                    render: (data) => number_format(data),
                }, {
                    title: 'Giảm giá',
                    dataIndex: 'discount_value'
                }, {
                    title: 'Tổng tiền thanh toán',
                    dataIndex: 'total_final_value',
                    render: (data) => number_format(data),
                }, {
                    title: 'Phương thức thanh toán',
                    dataIndex: 'pay_method',
                    render: (value) => {
                        if (value === 0) return (<Tag color="green">Tiền mặt</Tag>);
                        if (value === 1) return (<Tag color="blue">Thẻ</Tag>);
                        if (value === 2) return (<Tag color="purple">MOMO</Tag>);
                    }
                }
            ];
            this.fields = this.columns.map(col => col.dataIndex);
            this.columns.push({
                title: 'Hành động',
                fixed: 'right',
                render: (text, record) => (<Tooltip title="Xem chi tiết">
                    <Link to={"/invoice/" + record.id}>
                        <Button icon={<EyeOutlined/>}/>
                    </Link>
                </Tooltip>)
            });
        }

        getData = (params = {}) => {
            this.setState({loading: true});
            axios.get('/invoice', {
                params: {
                    results: 10,
                    fields: this.fields.join(','),
                    ...params
                }
            }).then(res => {
                let pagination = {...this.state.pagination};
                pagination.total = res.data.total || 0;
                this.setState({data: res.data.rows, pagination});
            }).catch(err => {
                console.log(err);
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
            }).finally(() => {
                this.setState({loading: false});
            });

        };

        componentDidMount() {
            if (this.props.staff.token) {
                this.getData();
            }
        };

        render() {
            return (
                <div>
                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}
                        title="Hóa đơn"
                        subTitle="Quản lý hóa đơn bán hàng"
                    />
                    <div className="container">
                        <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data}
                               pagination={this.state.pagination} size="small" rowKey="id"
                               scroll={{x: true}}/>
                    </div>
                </div>
            );
        }
    }
);

export default withRouter(InvoicePage);
