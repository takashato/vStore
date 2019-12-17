import React from 'react';
import {Layout, Menu, Icon, PageHeader} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Switch, Route, Redirect} from "react-router-dom";
import StaffPage from "../pages/StaffPage";
import FooterLayout from "./FooterLayout";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import CustomerPage from "../pages/CustomerPage";
import ReceiptPage from "../pages/ReceiptPage";
import SalePage from "../pages/SalePage";
import ReportPage from "../pages/ReportPage";
import DashboardPage from "../pages/DashboardPage";
import ReportRevenuePage from "../pages/ReportRevenuePage";
import InvoicePage from "../pages/InvoicePage";
import {connect} from "react-redux";

const {Content} = Layout;

class MainLayout extends React.Component {
    render() {
        if (!this.props.staff.staff) return null;
        const {permissions} = this.props.staff.staff;
        if (!permissions) return null;
        return (
            <Layout className='main-layout'>
                <SideBar/>
                <Layout>
                    <TopBar/>
                    <Content style={{margin: '24px 16px 0'}}>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/dashboard"/>
                            </Route>
                            <Route path="/dashboard">
                                <DashboardPage/>
                            </Route>
                            {permissions.staff ?
                                <Route path='/staff'>
                                    <StaffPage/>
                                </Route> : null}
                            {permissions.product.read ?
                                <Route path='/category'>
                                    <CategoryPage/>
                                </Route> : null}
                            {permissions.product.read ?
                                <Route path='/product'>
                                    <ProductPage/>
                                </Route> : null}
                            {permissions.sale ?
                                <Route path='/sale'>
                                    <SalePage/>
                                </Route> : null}
                            {permissions.customer.read ?
                                <Route path='/customer'>
                                    <CustomerPage/>
                                </Route> : null}
                            {permissions.receipt.read ?
                                <Route path='/receipt'>
                                    <ReceiptPage/>
                                </Route> : null}
                            {permissions.report ?
                                <Route path='/report/inventory'>
                                    <ReportPage/>
                                </Route> : null}
                            {permissions.report ?
                                <Route path='/report/revenue'>
                                    <ReportRevenuePage/>
                                </Route> : null}
                            {permissions.invoice ?
                                <Route path='/invoice'>
                                    <InvoicePage/>
                                </Route> : null}
                            <Route>

                            </Route>
                        </Switch>
                    </Content>
                    <FooterLayout/>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        staff: state.staff
    };
};

export default connect(mapStateToProps)(MainLayout);