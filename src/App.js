import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginLayout from "./components/layouts/LoginLayout";
import MainLayout from "./components/layouts/MainLayout";
import {connect, Provider} from "react-redux";
import reducers from "./redux/reducers/combined";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {setToken} from "./redux/actions/staff";

const store = createStore(reducers, applyMiddleware(thunk));


class App extends React.Component {
    state = {
        redirectToLogin: false,
        lastLocation: this.props.location.pathname === '/login' ? '/' : this.props.location.pathname,
    };

    componentDidMount() {
        this.props.getTokenFromStorage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('App updatd');
        if (this.props.staff.token == null && !prevState.redirectToLogin) {
            console.log('Redirect to login', this.props.location);
            this.setState({redirectToLogin: true, lastLocation: this.props.location.pathname});
        }
        if (this.props.staff.token != null && prevState.redirectToLogin) {
            console.log('Redirect to home');
            this.setState({redirectToLogin: false});
        }
    }

    render() {
        console.log(this.state.lastLocation);

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
            let token = sessionStorage.getItem('session_token');
            dispatch(setToken(token));
        }
    };
};

const VisibleApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

class AppContainer extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <VisibleApp/>
            </BrowserRouter>
        );
    }
}

function ProvidedApp() {
    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
}

export default ProvidedApp;
