import React from 'react';

import {
    DashboardOutlined,
    DatabaseOutlined,
    FileTextOutlined,
    FormOutlined,
    ShoppingCartOutlined,
    SnippetsOutlined,
    StockOutlined,
    TagsOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { Menu, Layout, Typography } from "antd";
import {Link, withRouter} from "react-router-dom";

import './SideBar.css';
import {connect} from "react-redux";

const {Sider} = Layout;

class SideBar extends React.Component {
    render() {
        let defaultOpenKeys = [];
        if (this.props.location.pathname === "/category" || this.props.location.pathname === "/product") {
            defaultOpenKeys = ['k_product'];
        }
        if (this.props.location.pathname === "/report/inventory" || this.props.location.pathname === "/report/revenue") {
            defaultOpenKeys = ['k_report'];
        }
        if (!this.props.staff.staff) return null;
        const {permissions} = this.props.staff.staff;
        if (!permissions) return null;
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} width="100%" height="auto"/>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.location.pathname}
                      defaultOpenKeys={defaultOpenKeys}>
                    <Menu.Item key="/dashboard">
                        <Link to="/dashboard">
                            <DashboardOutlined />
                            <span>Trang chính</span>
                        </Link>
                    </Menu.Item>
                    {permissions.staff ?
                        <Menu.Item key="/staff">
                            <Link to='/staff'>
                                <UserOutlined />
                                <span>Nhân viên</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.product.read ?
                        <Menu.SubMenu key="k_product" title={
                            <span>
                            <DatabaseOutlined />
                            <span>Sản phẩm</span>
                        </span>
                        }>
                            <Menu.Item key="/product">
                                <Link to="/product">
                                    <TagsOutlined />
                                    <span>Sản phẩm</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/category">
                                <Link to="/category">
                                    <UnorderedListOutlined />
                                    <span>Danh mục</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
                    {permissions.sale ?
                        <Menu.Item key="/sale">
                            <Link to="/sale">
                                <ShoppingCartOutlined />
                                <span><b>Bán hàng</b></span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.invoice ?
                        <Menu.Item key="/invoice">
                            <Link to="/invoice">
                                <FileTextOutlined />
                                <span>Hóa đơn</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.receipt.read ?
                        <Menu.Item key="/receipt">
                            <Link to="/receipt">
                                <SnippetsOutlined />
                                <span>Nhập / xuất kho</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.customer ?
                        <Menu.Item key="/customer">
                            <Link to='/customer'>
                                <TeamOutlined />
                                <span>Khách hàng</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.report ?
                        <Menu.SubMenu key="k_report" title={
                            <span>
                            <FormOutlined />
                            <span>Báo cáo</span>
                        </span>
                        }>
                            <Menu.Item key="/report/inventory">
                                <Link to='/report/inventory'>
                                    <DatabaseOutlined />
                                    <span>Kiểm kho</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/report/revenue">
                                <Link to='/report/revenue'>
                                    <StockOutlined />
                                    <span>Doanh thu</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
                    <Menu.Item key="/setting">
                        <Link to="/setting">
                            <SettingOutlined />
                            <span>Cài đặt</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff,
    }
};

export default withRouter(connect(mapStateToProps)(SideBar));