import React from 'react';
import {Layout, Menu, message, PageHeader} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Switch, Route, Redirect, Link} from "react-router-dom";
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
import SettingPage from "../pages/SettingPage";
import axios from "../../libs/axios";

const {Content} = Layout;

class MainLayout extends React.Component {
    state = {
        groups: [],
    };

    getSettingGroups = () => {
        axios.get('/setting').then(res => {
            this.setState({groups: res.data.settingGroups});
        }).catch(err => {
            message.error('Không thể lấy thông tin cài đặt');
        });
    };

    componentDidMount() {
        if (this.props.staff.token) {
            this.getSettingGroups();
        }
    }

    render() {
        const {groups} = this.state;

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
                            {groups.map((group) =>
                                <Route path={"/setting/" + group.varname}>
                                    <SettingPage description={group.description} groupId={group.id}/>
                                </Route>)}
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