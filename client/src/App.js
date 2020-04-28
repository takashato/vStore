import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";
import {connect, Provider} from "react-redux";
import config from "./config.json";
import {setToken} from "./redux/actions/staff";
import {ConfigProvider, Spin} from "antd";
import viVN from "antd/es/locale/vi_VN";
import store from "./store";

class App extends React.Component {
    state = {
        initialized: false,
        redirectToLogin: false,
        lastLocation: this.props.location.pathname === '/login' ? '/' : this.props.location.pathname,
    };

    componentDidMount() {
        this.props.getTokenFromStorage();
        this.setState({initialized: true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.staff.token == null && !prevState.redirectToLogin) {
            this.setState({redirectToLogin: true, lastLocation: this.props.location.pathname});
        }
        if (this.props.staff.token != null && prevState.redirectToLogin) {
            this.setState({redirectToLogin: false});
        }
    }

    render() {
        if (!this.state.initialized) {
            return (
                <Spin tip="Đang tải...">
                    <div className='loading-screen'/>
                </Spin>
            );
        }

        return (
            <>
                {
                    this.state.redirectToLogin
                        ? <Redirect from='*' to='/login'/>
                        : <Redirect from='/login' to={this.state.lastLocation}/>
                }
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
    }
}


const mapStateToProps = state => {
    return {
        staff: state.staff
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTokenFromStorage: () => {
            let token = localStorage.getItem('session_token') || sessionStorage.getItem('session_token');
            dispatch(setToken(token));
        }
    };
};

const VisibleApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

class AppContainer extends React.Component {
    render() {
        return (
            <BrowserRouter basename={config.routerBaseName}>
                <VisibleApp/>
            </BrowserRouter>
        );
    }
}

function ProvidedApp() {
    return (
        <Provider store={store}>
            <ConfigProvider locale={viVN}>
                <AppContainer/>
            </ConfigProvider>
        </Provider>
    );
}

export default ProvidedApp;
