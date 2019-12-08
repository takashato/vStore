import React from 'react';
import {Col, Dropdown, Icon, Layout, Menu, Row, message} from 'antd';
import {Link} from "react-router-dom";

import './TopBar.css';
import {connect} from "react-redux";
import {doLogout, setToken} from "../../redux/actions/staff";

const {Header} = Layout;

class TopBar extends React.Component {
    doLogout(e) {
        this.props.doLogout();
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
                        <span>admin <Icon type="down" /></span>
                    </Dropdown>
                </div>
            </Header>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doLogout: () => dispatch(doLogout())
    };
};

const VisibleTopBar = connect(null, mapDispatchToProps)(TopBar);

export default VisibleTopBar;