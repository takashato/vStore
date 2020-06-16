import React, {useState} from 'react';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import {Button, Checkbox, Form, Input} from 'antd';

import {useDispatch} from "react-redux";
import {useApolloClient} from "@apollo/react-hooks";
import {LOGIN_QUERY} from "../../graphql/query";

import {setToken} from "../../redux/actions/staff";

import './LoginForm.css';

const LoginForm = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const client = useApolloClient();

    const [isLoading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const {data} = await client.query({
                query: LOGIN_QUERY,
                variables: {
                    auth: {
                        username: values.username,
                        password: values.password,
                    }
                }
            });
            dispatch(setToken(data.authenticate.token));
            if (values.save_password) {
                localStorage.setItem('session_token', data.authenticate.token);
            } else {
                sessionStorage.setItem('session_token', data.authenticate.token);
            }
        } catch (err) {
            err.graphQLErrors.forEach(e => {
                console.log(e);
                form.setFields([
                    {
                        name: e.extensions.field,
                        errors: [e.message],
                    }
                ]);
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (err) => {
    };

    return (
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} className="login-form">
            <Form.Item
                name="username"
                rules={[{required: true, message: 'Vui lòng nhập tên tài khoản!'}]}
            >
                <Input
                    prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="Tên tài khoản"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
            >
                <Input.Password
                    prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="Mật khẩu"
                />
            </Form.Item>
            <Form.Item
                name="save_password"
                valuePropName="checked"
            >
                <Checkbox>Lưu tài khoản</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}>
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
