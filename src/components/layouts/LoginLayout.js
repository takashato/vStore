import React from 'react';
import LoginForm from "../forms/LoginForm";
import {Divider} from 'antd';

import './LoginLayout.css';

class LoginLayout extends React.Component {
    render() {
        return (
            <div className="login-area">
                <div className="login-wrapper">
                    <Divider orientation="left">ĐĂNG NHẬP</Divider>
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default LoginLayout;