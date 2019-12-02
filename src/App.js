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

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
    state = {
        loggedIn: false
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.staff.token == null && this.props.staff.token != null) {
            this.setState({loggedIn: true});
        }
    }

    render() {
        return (
            <BrowserRouter>
                {this.state.loggedIn
                    ? <Redirect from='/login' to='/'/>
                    : <Redirect from='*' to='/login'/>
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

const VisibleApp = connect(mapStateToProps, null)(App);

function ProvidedApp() {
    return (
        <Provider store={store}>
            <VisibleApp/>
        </Provider>
    );
}

export default ProvidedApp;
