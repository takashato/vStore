import React from 'react';
import {Layout, Menu, Icon, PageHeader} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Switch, Route} from "react-router-dom";
import StaffPage from "../pages/StaffPage";

const {Header, Content, Footer, Sider} = Layout;

class MainLayout extends React.Component {
    render() {
        return (
            <Layout className='main-layout'>
                <SideBar/>
                <Layout>
                    <TopBar/>
                    <Content style={{margin: '24px 16px 0'}}>
                        <Switch>
                            <Route exact path='/staff'>
                                <StaffPage/>
                            </Route>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;