import React from 'react';
import {Icon, Menu, Layout, Typography} from "antd";
import {Link, withRouter} from "react-router-dom";

const {Sider} = Layout;

class SideBar extends React.Component {
    render() {
        let defaultOpenKeys = [];
        if (this.props.location.pathname === "/category" || this.props.location.pathname === "/product") {
            defaultOpenKeys = ['k_product'];
        }
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.location.pathname}
                      defaultOpenKeys={defaultOpenKeys}>
                    <Menu.Item key="/dashboard">
                        <Link to="/dashboard">
                            <Icon type="dashboard"/>
                            <span>Trang chính</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/staff">
                        <Link to='/staff'>
                            <Icon type="user"/>
                            <span>Nhân viên</span>
                        </Link>
                    </Menu.Item>
                    <Menu.SubMenu key="k_product" title={
                        <span>
                            <Icon type="database"/>
                            <span>Sản phẩm</span>
                        </span>
                    }>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="tags"/>
                                <span>Sản phẩm</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="unordered-list"/>
                                <span>Danh mục</span>
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="/sale">
                        <Link to="/sale">
                            <Icon type="shopping-cart"/>
                            <span><b>Bán hàng</b></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/receipt">
                        <Link to="/receipt">
                            <Icon type="snippets"/>
                            <span>Nhập / xuất kho</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/customer">
                        <Link to='/customer'>
                            <Icon type="team"/>
                            <span>Khách hàng</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/statistical">
                        <Link to='/statistical'>
                            <Icon type="line-chart" />
                            <span>Thống kê</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideBar);