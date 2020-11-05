import React, {useEffect, useState} from 'react';
import 'styles/index.less';
import './App.css';
import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";
import {Provider, useDispatch, useSelector} from "react-redux";
import {ApolloProvider} from "@apollo/react-hooks";
import config from "./config.json";
import {ConfigProvider, Spin, Typography} from "antd";
import viVN from "antd/es/locale/vi_VN";
import store from "./states/redux/store";
import client from "./graphql/client";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {setToken} from "./states/redux/actions/staff";
import {RecoilRoot} from "recoil";
import {getRealRoutes} from "./components/routes";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const staff = useSelector(state => state.staff);

    const [fetched, setFetched] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [refPath, setRefPath] = useState(history.location.pathname === '/login' ? '/' : history.location.pathname);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('session_token') || sessionStorage.getItem('session_token');
            if (token) {
                await dispatch(setToken(token));
            }
            setFetched(true);
        })();
    }, []);

    useEffect(() => {
        console.log('path app', history.location.pathname);
        console.log('ref path', refPath);
        if (fetched) {
            setInitialized(true);
            if (history.location.pathname !== '/login' && !staff.token) {
                setRefPath(history.location.pathname);
                history.push('/login');
            } else if (staff.token) {
                if (refPath === '/login') {
                    history.push('/');
                }
                history.push(refPath);
            }
        }
    }, [fetched, staff.token]);

    if (!fetched || !initialized) {
        return (
            <Spin tip="Đang tải...">
                <div className='loading-screen'/>
            </Spin>
        );
    }

    const notFoundContent = () => (
        <Typography.Title>Trang không tồn tại hoặc bạn không được phép truy
            cập!</Typography.Title>
    );

    return (
        <>
            <Switch>
                <Route path='/login'>
                    <LoginLayout/>
                </Route>
                <Route>
                    <MainLayout>
                        <Switch>
                            {getRealRoutes().map(route => {
                                return (
                                    <ProtectedRoute
                                        permissions={route.permissions}
                                        path={route.path}
                                        exact={route.exact ?? true}
                                        fallback={notFoundContent}
                                    >
                                        <route.component/>
                                    </ProtectedRoute>
                                );
                            })}
                        </Switch>
                    </MainLayout>
                </Route>
            </Switch>
        </>
    );
};

const AppContainer = () => {
    return (
        <BrowserRouter basename={config.routerBaseName}>
            <App/>
        </BrowserRouter>
    );
};

const ProvidedApp = () => {
    return (
        <RecoilRoot>
            <Provider store={store}>
                <ApolloProvider client={client}>
                    <ConfigProvider locale={viVN}>
                        <AppContainer/>
                    </ConfigProvider>
                </ApolloProvider>
            </Provider>
        </RecoilRoot>
    );
};

export default ProvidedApp;
