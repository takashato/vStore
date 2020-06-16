import React from 'react';
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Dropdown, Layout, Menu, Row, message } from 'antd';
import {Link} from "react-router-dom";

import './TopBar.css';
import {connect} from "react-redux";
import {doLogout, setToken} from "../../redux/actions/staff";

const {Header} = Layout;

class TopBar extends React.Component {
    doLogout(e) {
        this.props.doLogout();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        if (!this.props.staff.staff) return null;

        const userDropdown = (
            <Menu>
                <Menu.Item key="0" disabled>
                    <span>
                        <UserOutlined />
                        <span>{this.props.staff.staff.staff.full_name}</span>
                    </span>
                </Menu.Item>
                <Menu.Item key="1" onClick={this.doLogout.bind(this)}>
                    <span>
                        <LogoutOutlined />
                        <span>Đăng xuất</span>
                    </span>
                </Menu.Item>
            </Menu>
        );

        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div className='user-dropdown'>
                    <Dropdown overlay={userDropdown}>
                        <span>{this.props.staff.staff.staff.username} <DownOutlined /></span>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogout: () => dispatch(doLogout())
    };
};

const VisibleTopBar = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default VisibleTopBar;
