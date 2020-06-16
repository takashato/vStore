import React, {useEffect} from 'react';
import {Layout} from 'antd';
import './MainLayout.css';
import SideBar from './SideBar';
import TopBar from "./TopBar";
import {Route, Switch, useHistory} from "react-router-dom";
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
import {useSelector} from "react-redux";

const {Content} = Layout;

const MainLayoutHook = (props) => {
    const history = useHistory();

    const staff = useSelector(state => state.staff);

    useEffect(() => {
        console.log('path main layout', history.location.pathname);
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    }, []);

    if (!staff.staff) return null;
    const {permissions} = staff.staff;
    if (!permissions) return null;

    return (
        <Layout className='main-layout'>
            <SideBar/>
            <Layout>
                <TopBar/>
                <Content style={{margin: '24px 16px 0'}}>
                    <Switch>
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
                        {/*{groups.map((group) =>*/}
                        {/*    <Route path={"/setting/" + group.varname}>*/}
                        {/*        <SettingPage description={group.description} groupId={group.id}/>*/}
                        {/*    </Route>)}*/}
                    </Switch>
                </Content>
                <FooterLayout/>
            </Layout>
        </Layout>
    );
};

export default MainLayoutHook;
