import React from 'react';
import {Form, Icon, Input, Button, message, Checkbox} from 'antd';

import './LoginForm.css';
import axios from "../../libs/axios";
import {setToken} from "../../redux/actions/staff";
import {connect} from "react-redux";

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                message.destroy();
                let loadingMsg = message.loading('Đang đăng nhập...');
                console.log(values);
                try {
                    let res = await axios.post('/staff/auth', {username: values.username, password: values.password});
                    await message.success('Đăng nhập thành công!', 0.5);
                    this.props.setToken(res.data.token);
                    if (values.save_password) {
                        localStorage.setItem('session_token', res.data.token);
                    } else {
                        sessionStorage.setItem('session_token', res.data.token);
                    }
                } catch (err) {
                    message.error(err.response.data.userMessage ? err.response.data.userMessage : 'Đăng nhập thất bại!');
                } finally {
                    loadingMsg();
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Vui lòng nhập tên tài khoản!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Tên tài khoản"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Vui lòng nhập mật khẩu!'}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Mật khẩu"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('save_password')(<Checkbox>Lưu tài khoản</Checkbox>)}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setToken: (token) => dispatch(setToken(token))
    };
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

const VisibleLoginForm = connect(null, mapDispatchToProps)(WrappedNormalLoginForm);

export default VisibleLoginForm;