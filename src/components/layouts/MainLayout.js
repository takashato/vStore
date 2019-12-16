import React from 'react';
import {Layout, Menu, Icon, PageHeader} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Switch, Route} from "react-router-dom";
import StaffPage from "../pages/StaffPage";
import FooterLayout from "./FooterLayout";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import CustomerPage from "../pages/CustomerPage";
import ReceiptPage from "../pages/ReceiptPage";
import SalePage from "../pages/SalePage";
import ReportPage from "../pages/ReportPage";

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
                            <Route path='/staff'>
                                <StaffPage/>
                            </Route>
                            <Route path='/category'>
                                <CategoryPage/>
                            </Route>
                            <Route path='/product'>
                                <ProductPage/>
                            </Route>
                            <Route path='/sale'>
                                <SalePage/>
                            </Route>
                            <Route path='/customer'>
                                <CustomerPage/>
                            </Route>
                            <Route path='/receipt'>
                                <ReceiptPage/>
                            </Route>
                            <Route path='/report'>
                                <ReportPage/>
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