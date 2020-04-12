import React from 'react';
import {Link, withRouter} from "react-router-dom";
import axios from "../../libs/axios";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Alert, Badge, Descriptions, PageHeader, Spin, Table, Tag, Typography } from "antd";
import momentTz from "../../libs/moment";
import {number_format} from "../../libs/number_formater";

class ReceiptDetailPage extends React.Component {
    state = {
        error: false,
        loading: false,
        data: null,
    };

    constructor(props) {
        super(props);

        this.fields = [
            'id',
            'type',
            'description',
            'source',
            'staff_id',
            'staff', // Joined fields
            'customer_id',
            'customer', // ^
            'total',
            'total_money',
            'total_amount',
            'created_at',
            'updated_at',
            'details', // Joined fields
        ];
    }

    getData = () => {
        this.setState({loading: true});
        axios.get('/receipt/' + this.id, {
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
        if (this.state.error) return (<Alert message="Phiếu nhập / xuất không tồn tại." type="error"/>);
        if (!this.state.data) return (<div style={{padding: 'auto', textAlign: 'center'}}><Spin tip="Đang lấy dữ liệu..." size="large"/></div>);
        const {data} = this.state;
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Phiếu nhập / xuất"
                    subTitle={'#' + this.id}
                    backIcon={<Link to="/receipt"><ArrowLeftOutlined /></Link>}
                    onBack={() => null}
                />
                <Spin spinning={this.state.loading}>
                    <Descriptions bordered>
                        <Descriptions.Item label="Loại phiếu">{data.type === 1 ? <Tag color="blue">Phiếu nhập</Tag> :
                            <Tag color="green">Phiếu xuất</Tag>}</Descriptions.Item>
                        <Descriptions.Item
                            label="Ngày tạo">{momentTz(data.created_at).format('HH:mm:ss DD/MM/YYYY')}</Descriptions.Item>
                        <Descriptions.Item
                            label="Người tạo">{data.staff.id + " - (" + data.staff.username + ") " + data.staff.full_name}</Descriptions.Item>
                        <Descriptions.Item label="Nguồn" span={2}>{data.source}</Descriptions.Item>
                        <Descriptions.Item
                            label="Khách hàng">{data.customer ? data.customer.full_name + " - " + data.customer.phone_number : "Không có"}</Descriptions.Item>
                        <Descriptions.Item label="Ghi chú" span={3}>{data.description || "Không có"}</Descriptions.Item>
                        <Descriptions.Item label="Số sản phẩm"><Tag color="blue">{data.total}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Tổng số lượng"><Tag
                            color="green">{data.total_amount}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền"><Typography.Text
                            strong>{number_format(data.total_money)}</Typography.Text></Descriptions.Item>
                    </Descriptions>
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
                    ]} title={() => (<Typography.Title level={4}>Chi tiết</Typography.Title>)}
                           dataSource={data.details} pagination={false}/>
                </Spin>
            </div>
        );
    }
}

export default withRouter(ReceiptDetailPage);