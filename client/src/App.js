import React, {useEffect, useState} from 'react';


import {Provider, useDispatch, useSelector} from "react-redux";
import {ApolloProvider} from "@apollo/react-hooks";
import {ConfigProvider, Spin} from "antd";
import viVN from "antd/es/locale/vi_VN";

import "./assets/vendors/style.js";
import "./styles/wieldy.less";

import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";

import config from "./config.json";
import store from "./redux/store";
import client from "./graphql/client";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {setToken} from "./redux/actions/staff";

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
    return (
        <>
            <Switch>
                <Route path='/login'>
                    <LoginLayout/>
                </Route>
                <Route>
                    <MainLayout/>
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
        <Provider store={store}>
            <ApolloProvider client={client}>
                <ConfigProvider locale={viVN}>
                    <AppContainer/>
                </ConfigProvider>
            </ApolloProvider>
        </Provider>
    );
};

export default ProvidedApp;
