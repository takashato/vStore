import React from 'react';
import {Icon, Menu, Layout} from "antd";
import {Link, withRouter} from "react-router-dom";

const {Sider} = Layout;

class SideBar extends React.Component {
    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.props.location.pathname}>
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
                    <Menu.Item key="/category">
                        <Link to="/category">
                            <Icon type="unordered-list"/>
                            <span>Danh mục sản phẩm</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(SideBar);