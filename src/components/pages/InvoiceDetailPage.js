import React from 'react';
import {Link, withRouter} from "react-router-dom";
import axios from "../../libs/axios";
import {Alert, Badge, Divider, Icon, PageHeader, Spin, Table, Tag, Typography, Form, Button, Descriptions} from "antd";
import momentTz from "../../libs/moment";
import {number_format} from "../../libs/number_formater";
import InvoicePage from "./InvoicePage";

class InvoiceDetailPage extends React.Component {
    state = {
        error: false,
        loading: false,
        data: null,
    };

    constructor(props) {
        super(props);

        this.fields = [
            'id',
            'staff_id',
            'staff', // Joined fields
            'customer_id',
            'customer', // ^
            'prepaid_value',
            'total_value',
            'discount_value',
            'total_final_value',
            'pay_method',
            'created_at',
            'updated_at',
            'details', // Joined fields
        ];


    }

    getData = () => {
        this.setState({loading: true});
        axios.get('/invoice/' + this.id, {
            params: {
                fields: this.fields.join(','),
            }
        }).then(res => {
            this.setState({error: false, data: res.data});
        }).catch(err => {
            this.setState({error: true})
        }).finally(() => {
            this.setState({loading: false});
        });
    };

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.setState({error: false, data: null});
        this.getData();
    }

    render() {
        if (this.state.error) return (<Alert message="Hóa đơn không tồn tại." type="error"/>);

        if (!this.state.data) return (<div style={{padding: 'auto', textAlign: 'center'}}><Spin tip="Đang lấy dữ liệu..." size="large"/></div>);

        const {data} = this.state;
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Hóa đơn bán hàng"
                    subTitle={'#' + this.id}
                    backIcon={<Link to="/invoice"><Icon type="arrow-left" /></Link>}
                    onBack={() => null}
                />
                <div className="container">
                    <Table columns={[
                        {
                            title: 'Sản phẩm',
                            dataIndex: 'product',
                            render: (product) => (<Typography.Text strong>{product.bar_code + ' - ' + product.name}</Typography.Text>)
                        }, {
                            title: 'Số lượng',
                            dataIndex: 'amount',
                        }, {
                            title: 'Đơn giá',
                            dataIndex: 'price',
                            render: (data) => number_format(data),
                        }, {
                            title: 'Thành tiền',
                            dataIndex: 'total_money',
                            render: (data) => number_format(data),
                        }
                    ]} dataSource={data.details} pagination={false} title={() => (
                        <div>
                            <h4>
                                Ngày lập: {momentTz(data.created_at).format('HH:mm:ss DD/MM/YYYY')}
                            </h4>
                            <h4>
                                Nhân viên: {data.staff.username + " - " + data.staff.full_name}
                            </h4>
                            <h4>
                                Khách hàng: {data.customer.full_name}
                            </h4>
                        </div>
                    )}/>
                    <Divider/>
                    <Descriptions>
                        <Descriptions.Item label="Tổng tiền">
                            {number_format(data.total_value)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giảm giá">
                            {data.discount_value}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền thanh toán">
                            {number_format(data.total_final_value)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiền khách đưa">
                            {number_format(data.prepaid_value)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tiền thối">
                            {number_format(data.total_final_value - data.prepaid_value)}
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        );
    }
}

export default withRouter(InvoiceDetailPage);