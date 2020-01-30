import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {checkAuthState} from "./store/actions";

import Layout from "./HigherOrderComponents/Layout/Layout";
import AsyncComponent from "./HigherOrderComponents/AsyncComponent/AsyncComponent";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";

const asyncCheckOut = AsyncComponent(() => {
    return import("./containers/Checkout/Checkout")
});

const asyncOrders = AsyncComponent(() => {
    return import("./containers/Orders/Orders")
});

const asyncAuth = AsyncComponent(() => {
    return import("./containers/Auth/Auth")
});



class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render(){
        let routes = (
            <Switch>
                <Route path={'/auth'} component={asyncAuth}/>
                <Route path={'/'} exact component={BurgerBuilder}/>
                <Redirect to={'/'}/>
            </Switch>
        );

        if (this.props.isAuthenticated)
            routes = (
                <Switch>
                    <Route path={'/checkout'} component={asyncCheckOut}/>
                    <Route path={'/orders'} component={asyncOrders}/>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path={'/auth'} component={asyncAuth}/>
                    <Route path={'/'} exact component={BurgerBuilder}/>
                    <Redirect to={'/'}/>
                </Switch>
            );


        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.AUTH.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(checkAuthState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
