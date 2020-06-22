import React, {useCallback, useEffect, useState} from "react";
import {Button, Form, Input, message, PageHeader} from "antd";
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "../../libs/axios";
import CategorySelector from "../forms/CategorySelector";
import InputFormatedNumnber from "../forms/InputFormatedNumber";
import {ArrowLeftOutlined} from "@ant-design/icons";

const ProductActionPage = () => {
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const history = useHistory();

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    };

    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };

    const onFinish = useCallback((values) => {
        if (!id) { // Add new
            setLoading(true);
            axios.post('/product', {
                ...values,
                category_id: values.category_id.key,
            }).then(res => {
                setLoading(false);
                message.success('Thêm sản phẩm thành công!');
                history.push('/product');
            }).catch(err => {
                message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi thêm sản phẩm.');
                setLoading(false);
            });
            return;
        }
        // Update
        setLoading(true);
        axios.put('/product/' + id, {
            ...values,
            category_id: values.category_id.key
        }).then(res => {
            setLoading(false);
            message.success('Cập nhật sản phẩm thành công!');
            history.push('/product');
        }).catch(err => {
            message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi cập nhật sản phẩm.');
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (id) {
            async function getData() {
                try {
                    //const hideMsg = message.loading('Đang lấy dữ liệu...');
                    let res = await axios.get('/product/' + id, {
                        params: {
                            fields: ['id', 'bar_code', 'name', 'category', 'price', 'original_price'].join(',')
                        }
                    });

                    form.setFieldsValue({
                        bar_code: res.data.bar_code,
                        name: res.data.name,
                        category_id: {
                            key: res.data.category.id,
                            label: res.data.category.name,
                        },
                        price: res.data.price,
                        original_price: res.data.original_price,
                    });
                } catch (err) {
                    message.error(err.response.data && err.response.data.userMessage ? err.response.data.userMessage : 'Lỗi khi lấy dữ liệu sản phẩm.');
                }
            }

            getData();
        }
    }, []);

    if (!id) {
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Thêm sản phẩm"
                    subTitle="Thêm sản phẩm mới"
                    backIcon={<Link to="/product"><ArrowLeftOutlined/></Link>}
                    onBack={() => null}
                />
                <div className="container">
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item name="bar_code" label="Bar code"
                                   rules={[{required: true, message: "Vui lòng nhập Bar Code."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="name" label="Tên sản phẩm"
                                   rules={[{required: true, message: "Vui lòng nhập tên sản phẩm."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="category_id" label="Danh mục"
                                   rules={[{required: true, message: "Vui lòng chọn danh mục."}]}>
                            <CategorySelector/>
                        </Form.Item>
                        <Form.Item name="price" label="Giá sản phẩm"
                                   rules={[{required: true, message: "Vui lòng nhập giá sản phẩm."}]}>
                            <InputFormatedNumnber placeholder="Giá tính thành tiền"/>
                        </Form.Item>
                        <Form.Item name="original_price" label="Giá gốc sản phẩm">
                            <InputFormatedNumnber placeholder="Giá gốc chưa khuyến mãi, có thể bỏ trống"/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Lưu lại
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                    }}
                    title="Sửa thông tin sản phẩm"
                    subTitle={"#" + id}
                    backIcon={<Link to="/product"><ArrowLeftOutlined/></Link>}
                    onBack={() => null}
                />
                <div className="container">
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                    >
                        <Form.Item name="bar_code" label="Bar code"
                                   rules={[{required: true, message: "Vui lòng nhập Bar Code."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="name" label="Tên sản phẩm"
                                   rules={[{required: true, message: "Vui lòng nhập tên sản phẩm."}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="category_id" label="Danh mục"
                                   rules={[{required: true, message: "Vui lòng chọn danh mục."}]}>
                            <CategorySelector/>
                        </Form.Item>
                        <Form.Item name="price" label="Giá sản phẩm"
                                   rules={[{required: true, message: "Vui lòng nhập giá sản phẩm."}]}>
                            <InputFormatedNumnber placeholder="Giá tính thành tiền"/>
                        </Form.Item>
                        <Form.Item name="original_price" label="Giá gốc sản phẩm">
                            <InputFormatedNumnber placeholder="Giá gốc chưa khuyến mãi, có thể bỏ trống"/>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Lưu lại
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
};

export default ProductActionPage;
