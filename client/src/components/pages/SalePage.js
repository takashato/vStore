import React from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import {Form} from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {Button, Col, Divider, InputNumber, message, notification, Row, Select, Table, Typography, Tooltip,} from "antd";
import ProductSelector from "../forms/ProductSelector";
import axios from "../../libs/axios";
import {number_format} from "../../libs/number_formater";
import CustomerSelector from "../forms/CustomerSelector";
import InputFormatedNumnber from "../forms/InputFormatedNumber";
import {withRouter} from "react-router-dom";

class SalePage extends React.Component {
    state = {
        details: [],
        customer: undefined,
        prepaid: 0,
        pay_method: "0",
        charge_money: 0,
    };

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Mã sản phẩm',
                dataIndex: 'bar_code',
            }, {
                title: 'Sản phẩm',
                dataIndex: 'name',
            }, {
                title: 'Số lượng',
                dataIndex: 'amount',
                render: (data, record) => (
                    <InputNumber min={0} value={data} onChange={(value) => this.handleChangeAmount(value, record.id)}/>)
            }, {
                title: 'Đơn giá',
                dataIndex: 'price',
                render: (data, record) => (<>
                    <Typography.Text strong>{number_format(data)}</Typography.Text><br/>
                    {record.original_price && record.original_price > record.price ?
                        <Typography.Text delete>{number_format(record.original_price)}</Typography.Text> : null}
                </>),
            }, {
                title: 'Thành tiền',
                dataIndex: 'total_money',
                render: (data, record) => (<>
                    <Typography.Text strong>{number_format(record.amount * record.price)}</Typography.Text><br/>
                    {record.original_price && record.original_price > record.price ? <Typography.Text
                        delete>{number_format(record.amount * record.original_price)}</Typography.Text> : null}
                </>)
            }, {
                title: '',
                render: (data, record) => (<>
                                                <Tooltip title="Xóa" placement="leftTop">
                                                    <Button type="danger" icon={<DeleteOutlined/>}
                                                     onClick={() => this.handleDelete(record.id)}/>
                                                </Tooltip>
                                           </>)
            }
        ];
    }

    handleChangeAmount = (value, id) => {
        const {details} = this.state;
        const index = details.findIndex(e => e.id === id);
        if (index <= -1) return;
        console.log('new value', value);
        details[index].amount = value;
        this.setState({details});
    };

    handleDelete = (id) => {
        const {details} = this.state;
        const index = details.findIndex(e => e.id === id);
        if (index <= -1) return;
        details.splice(index, 1);
        this.setState({details});
    };

    getProductData = async (id) => {
        try {
            const res = await axios.get('/product/' + id, {
                params: {
                    fields: 'id,bar_code,name,price,original_price'
                },
            });
            return res.data;
        } catch (err) {
            return null;
        }
    };

    handleSubmit = async (value) => {
        const data = await this.getProductData(value.key);
        if (data) {
            let details = this.state.details;
            const index = details.findIndex(e => e.id === data.id);
            if (index > -1) {
                details[index].amount++;
            } else {
                details.push({...data, amount: 1,});
            }
            this.setState({details});
        } else {
            message.error('Không thể thêm sản phẩm này.');
        }
    };

    handleCustomer = async (value) => {
        this.setState({customer: value});
    };


    handlePrepaid = (value) => {
        if (value < 0) return;
        this.setState({prepaid: value});
    };

    handlePayMethod = (value) => {
        this.setState({pay_method: value});
    };

    handleComplete = async () => {
        if (this.state.details.length <= 0) {
            message.error("Vui lòng thêm ít nhất một mặt hàng.");
            return;
        }
        if(this.state.charge_money < 0) {
            message.error("Tiền thanh toán không đủ.");
            return;
        }
        try {
            const res = await axios.post('/sale', {
                customer_id: this.state.customer ? this.state.customer.key : null,
                prepaid_value: this.state.prepaid,
                pay_method: this.state.pay_method,
                details: this.state.details.map(e => ({id: e.id, amount: e.amount})),
            });
            notification.success({
                message: 'Đã tạo đơn hàng # ' + res.data.id + '!',
                description: <Button onClick={() => this.goToInvoice(res.data.id)}>Xem đơn hàng</Button>
            });
            this.setState({
                details: [],
                customer: undefined,
                prepaid: 0,
                pay_method: "0",
                charge_money: 0,
            });
        } catch (err) {
            console.error(err);
            message.error(err.response && err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi tạo đơn hàng.');
        }
    };

    goToInvoice = (id) => {
        this.props.history.push('/invoice/' + id);
    };

    render() {
        const details = [...this.state.details];

        const total_money = this.state.details.reduce((acc, current) => acc + current.amount * current.price, 0);
        const total_orignal_money = this.state.details.reduce((acc, current) => acc + current.amount * (current.original_price || current.price), 0);
        const total_discount_money = total_orignal_money - total_money;
        this.state.charge_money = this.state.prepaid - total_money + total_discount_money;
        const total_charge_money = Math.max(0, this.state.prepaid - total_money + total_discount_money);
        const total = total_money - total_discount_money;
        return (
            <div>
                <Row gutter={[16, 8]}>
                    <Col lg={18}>
                        <ProductSelector style={{width: '100%'}} onChange={this.handleSubmit}/>
                        <Divider/>
                        <Table columns={this.columns} dataSource={details} pagination={false} rowKey="id"/>
                        <Divider/>
                    </Col>
                    <Col lg={6}>
                        <Form
                            layout="vertical"
                        >
                            <Form.Item label="Khách hàng">
                                <CustomerSelector onChange={this.handleCustomer} value={this.state.customer}
                                                  allowClear/>
                            </Form.Item>
                            <Form.Item label="Phương thức thanh toán">
                                <Select value={this.state.pay_method} onChange={this.handlePayMethod}>
                                    <Select.Option key="0">Tiền mặt</Select.Option>
                                    <Select.Option key="1">Thẻ</Select.Option>
                                    <Select.Option key="2">MOMO</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tiền trả trước">
                                <InputFormatedNumnber onChange={this.handlePrepaid} value={this.state.prepaid}/>
                            </Form.Item>
                            <Form.Item label="Tổng tiền">
                                <Typography.Title level={4}>{number_format(total_money)}</Typography.Title>
                            </Form.Item>
                            <Form.Item label="Giảm giá">
                                <Typography.Title
                                    level={4}>{number_format(total_discount_money)}</Typography.Title>
                            </Form.Item>
                            <Form.Item label="Thành tiền">
                                <Typography.Title level={4}>{number_format(total)}</Typography.Title>
                            </Form.Item>
                            <Form.Item label="Tiền thối">
                                <Typography.Title level={4}>{number_format(total_charge_money)}</Typography.Title>
                            </Form.Item>
                            <Form.Item>
                                <Button size="large" style={{width: '100%'}} type="primary"
                                        onClick={this.handleComplete}>Hoàn tất đơn hàng</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(SalePage);
