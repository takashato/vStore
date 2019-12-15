import * as React from "react";
import {Switch, Route, withRouter} from "react-router-dom";
import ReceiptDetailPage from "./ReceiptDetailPage";
import {Button, Collapse, Form, Input, InputNumber, message, Modal, PageHeader, Table, Tag} from "antd";
import axios from "../../libs/axios";
import {connect} from "react-redux";
import {number_format} from "../../libs/number_formater";
import ProductSelector from "../forms/ProductSelector";
import InputFormatedNumnber from "../forms/InputFormatedNumber";
import momentTz from "../../libs/moment";

class ReceiptPage extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/receipt">
                        <ReceiptManager/>
                    </Route>
                    <Route path="/receipt/:id" render={ReceiptDetailPage}/>
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

const ReceiptManager = connect(mapStateToProps)(
    class extends React.Component {
        state = {
            data: [],
            pagination: {},
            loading: false,
            modalVisible: false,
        };

        constructor(props) {
            super(props);

            this.columns = [
                {
                    title: 'Mã phiếu',
                    dataIndex: 'id'
                }, {
                    title: 'Loại phiếu',
                    dataIndex: 'type',
                    render: (data) => (data === 1 ? <Tag color="blue">Phiếu nhập</Tag> : <Tag color="green">Phiếu xuất</Tag>)
                }, {
                    title: 'Ngày thực hiện',
                    dataIndex: 'created_at',
                    render: (data) => momentTz(data).format("HH:mm:ss DD/MM/YYYY")
                }, {
                    title: 'Nhân viên',
                    dataIndex: 'staff',
                    render: (staff) => (`${staff.id} - ${staff.username}`)
                }, {
                    title: 'Nguồn',
                    dataIndex: 'source',
                }, {
                    title: 'Số sản phẩm',
                    dataIndex: 'total',
                }, {
                    title: 'Số lượng',
                    dataIndex: 'total_amount',
                }, {
                    title: 'Tổng tiền',
                    dataIndex: 'total_money',
                    render: (data) => number_format(data),
                }
            ];
            this.fields = this.columns.map(col => col.dataIndex);
        }

        getData = (params = {}) => {
            this.setState({loading: true});
            axios.get('/receipt', {
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
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu.');
            }).finally(() => {
                this.setState({loading: false});
            });

        };

        handleImportButton = (e) => {
            this.formRef.props.form.resetFields();
            this.setState({modalVisible: true});
        };

        handleCancelButton = () => {
            this.setState({modalVisible: false});
        };

        handleSubmit = () => {
            this.formRef.props.form.validateFields(async (err, values) => {
                if (err) return;
                const data = this.formRef.state.data;
                try {
                    const res = await axios.post('/receipt', {
                        ...values,
                        products: data.map(e => ({
                            ...e,
                            product_id: e.product.key,
                            product: undefined,
                            order: undefined
                        }))
                    });

                    message.success("Tạo phiếu nhập thành công");
                    this.setState({modalVisible: false});
                    this.formRef.setState({data: []});
                    this.formRef.props.form.resetFields();
                    this.formRef.formRef.props.form.resetFields();
                    this.getData();
                } catch (err) {
                    console.error(err);
                    message.error(err.response && err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi tạo phiếu nhập.');
                }
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
                        title="Nhập / xuất kho"
                        subTitle="Quản lý phiếu nhập xuất kho"
                    />
                    <div className="container">
                        <Table loading={this.state.loading} columns={this.columns} dataSource={this.state.data}
                               pagination={this.state.pagination} size="small" rowKey="id"
                               title={() => (
                                   <Form layout="inline">
                                       <Form.Item>
                                           <Button icon="plus" onClick={this.handleImportButton}>Nhập hàng</Button>
                                       </Form.Item>
                                   </Form>
                               )}/>
                        <CreateReceiptForm wrappedComponentRef={(ref) => this.formRef = ref} props={{
                            title: 'Tạo phiếu nhập',
                            visible: this.state.modalVisible,
                            onCancel: this.handleCancelButton,
                            onOk: this.handleSubmit,
                        }}/>
                    </div>
                </div>
            );
        }
    });

const CreateReceiptForm = Form.create({name: 'receipt_modal'})(
    class extends React.Component {
        state = {
            data: [],
        };

        constructor(props) {
            super(props);

            this.columns = [
                {
                    title: '#',
                    dataIndex: 'order'
                }, {
                    title: 'Sản phẩm',
                    dataIndex: 'product',
                    render: (data) => `${data.label}`,
                }, {
                    title: 'Số lượng',
                    dataIndex: 'amount',
                }, {
                    title: 'Đơn giá',
                    dataIndex: 'price',
                    render: (data) => number_format(data)
                }, {
                    title: 'Thành tiền',
                    dataIndex: 'total_money',
                    render: (data) => number_format(data),
                }, {
                    title: '',
                    render: (text, record) => (
                        <Button icon="delete" type="danger" onClick={() => this.handleRemoveEle(record.order)}/>
                    )
                }
            ];
        }

        handleRemoveEle = (order) => {
            let data = this.state.data;
            console.log(order, data);
            data.splice(order - 1, 1);
            this.setState({data: data});
        };

        handleProductAdd = (e) => {
            this.formRef.props.form.validateFields((err, values) => {
                if (err) return;
                let data = this.state.data;
                let index = data.findIndex(e => e.product.key === values.product.key);
                if (index > -1) {
                    data[index].amount += values.amount;
                    data[index].price = values.price;
                    data[index].total_money = data[index].amount * data[index].price;
                } else {
                    data.push({...values, total_money: values.amount * values.price});
                }

                // Re-index
                for (let i = 0; i < data.length; ++i) {
                    data[i].order = i + 1;
                }
                this.setState({data});
                this.formRef.props.form.resetFields();
            });
        };

        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <Modal {...this.props.props} width={700}>
                    <Form>
                        <Form.Item label="Mô tả">
                            {getFieldDecorator('description')(<Input.TextArea
                                placeholder="Nhập ghi chú / mô tả cho phiếu xuất này"/>)}
                        </Form.Item>
                        <Form.Item label="Nguồn hàng">
                            {getFieldDecorator('source', {
                                rules: [{required: true, message: "Vui lòng nhập nguồn hàng."}]
                            })(<Input placeholder="Nguồn nhập hàng"/>)}
                        </Form.Item>
                    </Form>
                    <Table columns={this.columns}
                           dataSource={this.state.data}
                           rowKey="order"
                           title={() => (
                               <Collapse defaultActiveKey="default">
                                   <Collapse.Panel key="default" header="Thêm sản phẩm">
                                       <AddReceiptRowForm wrappedComponentRef={(ref) => this.formRef = ref}
                                                          onSubmit={this.handleProductAdd}/>
                                   </Collapse.Panel>
                               </Collapse>
                           )}/>
                </Modal>
            );
        }
    }
);

const AddReceiptRowForm = Form.create({name: 'add_receipt_row_form'})(
    class extends React.Component {
        render() {
            const {getFieldDecorator} = this.props.form;
            return (
                <>
                    <Form>
                        <Form.Item>
                            {getFieldDecorator('product', {
                                rules: [{required: true, message: "Vui lòng chọn sản phẩm."}]
                            })(<ProductSelector style={{width: '100%'}} allowClear/>)}
                        </Form.Item>
                    </Form>
                    <Form layout="inline">
                        <Form.Item label="Số lượng">
                            {getFieldDecorator('amount', {
                                rules: [{required: true, message: "Vui lòng nhập số lượng"}],
                                initialValue: 1,
                            })(<InputNumber/>)}
                        </Form.Item>
                        <Form.Item label="Đơn giá">
                            {getFieldDecorator('price', {
                                rules: [{required: true, message: "Vui lòng nhập đơn giá"}],
                                initialValue: 0,
                            })(<InputFormatedNumnber/>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" icon="plus" onClick={this.props.onSubmit}>Thêm</Button>
                        </Form.Item>
                    </Form>
                </>
            );
        };
    }
);


export default withRouter(ReceiptPage);