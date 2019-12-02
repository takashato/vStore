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
    };

    componentDidMount() {
        this.props.getTokenFromStorage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('App updatd');
        if (this.props.staff.token == null && !prevState.redirectToLogin) {
            this.setState({redirectToLogin: true});
        }
        if (this.props.staff.token != null && prevState.redirectToLogin) {
            this.setState({redirectToLogin: false});
        }
    }

    render() {
        return (
            <BrowserRouter>
                {
                    this.state.redirectToLogin
                        ? <Redirect from='*' to='/login'/>
                        : <Redirect from='/login' to='/'/>
                }
                <Switch>
                    <Route path='/login'>
                        <LoginLayout/>
                    </Route>
                    <Route>
                        <MainLayout/>
                    </Route>
                </Switch>
            </BrowserRouter>
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
            let token = localStorage.getItem('session_token');
            dispatch(setToken(token));
        }
    };
};

const VisibleApp = connect(mapStateToProps, mapDispatchToProps)(App);

function ProvidedApp() {
    return (
        <Provider store={store}>
            <VisibleApp/>
        </Provider>
    );
}

export default ProvidedApp;
