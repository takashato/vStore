import {Divider} from "antd";

const LoginLayout = ({children}) => {
    return (
        <div className="login-area">
            <div className="login-wrapper">
                <div className="login-logo">
                    <img src="/login-logo.png" style={{background: "rgba(24,144,255, 0.3)", borderRadius: '8px'}} width="100%" height="auto"/>
                </div>
                <Divider orientation="left">ĐĂNG NHẬP</Divider>
                {children}
            </div>
        </div>
    );
};

export default LoginLayout;
