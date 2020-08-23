import React from 'react';
import LoginForm from "../forms/LoginForm";
import {Divider} from 'antd';

import './LoginLayout.css';

const LoginLayout = () => (
    <div className="login-area">
        <div className="login-wrapper">
            <div className="login-logo">
                <img src={process.env.PUBLIC_URL + "/login-logo.png"} style={{background: "rgba(24,144,255, 0.3)", borderRadius: '8px'}} width="100%" height="auto"/>
            </div>
            <Divider orientation="left">ĐĂNG NHẬP</Divider>
            <LoginForm/>
        </div>
    </div>
);

export default LoginLayout;
