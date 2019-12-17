import React from 'react';
import {Icon, Menu, Layout, Typography} from "antd";
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
                            <Icon type="dashboard"/>
                            <span>Trang chính</span>
                        </Link>
                    </Menu.Item>
                    {permissions.staff ?
                        <Menu.Item key="/staff">
                            <Link to='/staff'>
                                <Icon type="user"/>
                                <span>Nhân viên</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.product.read ?
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
                        </Menu.SubMenu> : null}
                    {permissions.sale ?
                        <Menu.Item key="/sale">
                            <Link to="/sale">
                                <Icon type="shopping-cart"/>
                                <span><b>Bán hàng</b></span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.invoice ?
                        <Menu.Item key="/invoice">
                            <Link to="/invoice">
                                <Icon type="file-text"/>
                                <span>Hóa đơn</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.receipt.read ?
                        <Menu.Item key="/receipt">
                            <Link to="/receipt">
                                <Icon type="snippets"/>
                                <span>Nhập / xuất kho</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.customer ?
                        <Menu.Item key="/customer">
                            <Link to='/customer'>
                                <Icon type="team"/>
                                <span>Khách hàng</span>
                            </Link>
                        </Menu.Item> : null}
                    {permissions.report ?
                        <Menu.SubMenu key="k_report" title={
                            <span>
                            <Icon type="form"/>
                            <span>Báo cáo</span>
                        </span>
                        }>
                            <Menu.Item key="/report/inventory">
                                <Link to='/report/inventory'>
                                    <Icon type="database"/>
                                    <span>Kiểm kho</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="/report/revenue">
                                <Link to='/report/revenue'>
                                    <Icon type="stock"/>
                                    <span>Doanh thu</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu> : null}
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