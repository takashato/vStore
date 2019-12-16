import React from 'react';
import {Card, Col, Icon, Row, Statistic, Typography} from "antd";
import {Link} from "react-router-dom";

class DashboardPage extends React.Component {
    state = {
        data: {},
    };

    render() {
        const {data} = this.state;
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col lg={6} span={12}>
                        <Link to="/product">
                            <Card>
                                <Statistic title="Tổng số sản phẩm" value={data.total_product}
                                           prefix={<Icon type="database"/>}/>
                            </Card>
                        </Link>
                    </Col>
                    <Col lg={6} span={12}>
                        <Link to="/product">
                            <Card>
                                <Statistic title="Sản phẩm hết hàng" value={data.total_out_of_stock_product}
                                           valueStyle={{color: 'red'}}
                                           prefix={<Icon type="database"/>}
                                           suffix={'/ ' + data.total_product}/>
                            </Card>
                        </Link>
                    </Col>
                    <Col lg={6} span={12}>
                        <Link to="customer">
                            <Card>
                                <Statistic title="Nhân viên" value={data.total_staff}
                                           prefix={<Icon type="user"/>}/>
                            </Card>
                        </Link>
                    </Col>
                    <Col lg={6} span={12}>
                        <Link to="/customer">
                            <Card>
                                <Statistic title="Khách hàng" value={data.total_customer}
                                           prefix={<Icon type="team"/>}/>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default DashboardPage;