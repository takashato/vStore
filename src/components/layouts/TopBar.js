import React from 'react';
import {Col, Dropdown, Icon, Layout, Menu, Row, message} from 'antd';
import {Link} from "react-router-dom";

import './TopBar.css';
import {connect} from "react-redux";
import {setToken} from "../../redux/actions/staff";

const {Header} = Layout;

class TopBar extends React.Component {
    doLogout(e) {
        message.destroy();
        sessionStorage.removeItem('session_token');
        this.props.setToken(null);
        message.success('Đăng xuất thành công!');
    }

    userDropdown = (
        <Menu>
            <Menu.Item key="1" onClick={this.doLogout.bind(this)}>
                    <span>
                        <Icon type="logout"/>
                        <span>Đăng xuất</span>
                    </span>
            </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div className='user-dropdown'>
                    <Dropdown overlay={this.userDropdown}>
                        <span>admin</span>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setToken: (token) => dispatch(setToken(token))
    };
};

const VisibleTopBar = connect(null, mapDispatchToProps)(TopBar);

export default VisibleTopBar;