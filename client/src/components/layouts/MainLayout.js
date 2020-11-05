import React from 'react';
import {Layout} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import FooterLayout from "./FooterLayout";

const {Content} = Layout;

const MainLayoutHook = ({children}) => {
    return (
        <Layout className='main-layout'>
            <SideBar/>
            <Layout>
                <TopBar/>
                <Content style={{margin: '24px 16px 0'}}>
                    {children}
                </Content>
                <FooterLayout/>
            </Layout>
        </Layout>
    );
};

export default MainLayoutHook;
