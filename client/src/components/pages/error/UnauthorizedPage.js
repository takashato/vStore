import React from 'react';
import {Result, Button} from "antd";
import {Link} from "react-router-dom";

const UnauthorizedPage = () => (
    <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không có quyền truy cập vào trang này."
        extra={<Link to="/"><Button type="primary">Trở về trang chính</Button></Link>}
    />
);

export default UnauthorizedPage;
