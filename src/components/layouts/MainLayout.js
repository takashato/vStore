import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
    render() {
        return (
            <Layout className='main-layout'>
                <SideBar/>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;