import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import {checkAuthState} from "./store/actions";

import Layout from "./HigherOrderComponents/Layout/Layout";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";


const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout")
});

const Orders = React.lazy(() => {
    return import("./containers/Orders/Orders")
});

const Auth = React.lazy(() => {
    return import("./containers/Auth/Auth")
});

// //Using the AsyncComponent we define ourselves in the hoc file
// import AsyncComponent from "./HigherOrderComponents/AsyncComponent/AsyncComponent";
//
// const asyncCheckOut = AsyncComponent(() => {
//     return import("./containers/Checkout/Checkout")
// });
//
// const asyncOrders = AsyncComponent(() => {
//     return import("./containers/Orders/Orders")
// });
//
// const asyncAuth = AsyncComponent(() => {
//     return import("./containers/Auth/Auth")
// });



const App  = (props) => {
    useEffect ( () => {
        props.onTryAutoSignUp();
    }, []);

    let routes = (
        <Switch>
            {/*<Route path={'/auth'} component={asyncAuth}/>*/}
            <Route path={'/auth'} render={(props) => <Auth {...props}/>}/>
            <Route path={'/'} exact component={BurgerBuilder}/>
            <Redirect to={'/'}/>
        </Switch>
    );

    if (props.isAuthenticated)
        routes = (
            <Switch>
                {/*<Route path={'/checkout'} component={asyncCheckOut}/>*/}
                {/*<Route path={'/orders'} component={asyncOrders}/>*/}
                <Route path={'/checkout'} render={(props) => <Checkout {...props}/>}/>
                <Route path={'/orders'} render={(props) => <Orders {...props}/>}/>
                <Route path={'/logout'} component={Logout}/>
                <Route path={'/auth'} render={(props) => <Auth {...props}/>}/>
                {/*<Route path={'/auth'} component={asyncAuth}/>*/}
                <Route path={'/'} exact component={BurgerBuilder}/>
                <Redirect to={'/'}/>
            </Switch>
        );


    return (
        <Layout>
            <Suspense fallback={<p>Loading...</p>}>
                {routes}
            </Suspense>
        </Layout>
    );
};

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
