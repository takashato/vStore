import React from 'react';
import {Layout, Menu, Icon, PageHeader} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Switch, Route} from "react-router-dom";
import StaffPage from "../pages/StaffPage";
import FooterLayout from "./FooterLayout";

const {Content} = Layout;

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
                    <FooterLayout/>
                </Layout>
            </Layout>
        );
    }
}

export default MainLayout;