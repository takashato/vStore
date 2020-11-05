import React from 'react';
import {Result, Button} from "antd";
import {Link} from "react-router-dom";

const NotFoundPage = () => (
    <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang này không tồn tại."
        extra={<Link to="/"><Button type="primary">Trở về trang chính</Button></Link>}
    />
);

export default NotFoundPage;
