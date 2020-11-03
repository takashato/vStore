import {Button, Checkbox, Form, Input, message, notification} from "antd";
import {useSetRecoilState} from "recoil";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {userTokenSelector} from "../../state/recoil/user";

import "../../styles/login.less";
import {useState} from "react";
import loginService from "../../services/loginService";
import Head from "next/head";

const LoginContainer = () => {
    const setToken = useSetRecoilState(userTokenSelector);

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const handleFinish = async ({username, password, save_password}) => {
        message.destroy();
        setLoading(true);
        try {
            const {data} = await loginService.doLogin({username, password});
            setToken(data.token);
            (save_password ? localStorage : sessionStorage).setItem('session_token', data.token)
            notification.success({
                message: "Đăng nhập thành công!",
            });
        } catch (err) {
            if (err.response) {
                const {code, userMessage} = err.response.data;
                let errorField;
                if (['missing_username_password', 'staff_not_found'].includes(code)) {
                    errorField = 'username';
                } else if (code === 'incorrect_password') {
                    errorField = 'password';
                }

                if (errorField) {
                    form.setFields([{
                        name: errorField,
                        errors: [userMessage],
                    }]);
                    return;
                }

                message.error(userMessage);
                return;
            }
            message.error("Gặp lỗi khi đăng nhập, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return <Login isLoading={loading} form={form} onFinish={handleFinish}/>;
};

const Login = ({isLoading, form, onFinish, onFinishFailed}) => {
    return (
        <>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} className="login-form">
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Vui lòng nhập tên tài khoản!'}]}
                    hasFeedback
                >
                    <Input
                        prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Tên tài khoản"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                    hasFeedback
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
        </>
    );
};

export default LoginContainer;
