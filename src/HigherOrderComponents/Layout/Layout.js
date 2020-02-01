import React, {useState} from "react";
import { connect } from 'react-redux';

import Auxiliary from "../Auxillary/Auxillary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import styles from './Layout.module.css';

const Layout = (props) => {
    const [sideDrawerIsVisible , setSideDrawerIsVisibleState] = useState(false);


    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisibleState(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisibleState(!sideDrawerIsVisible);
    };

    return (
        <Auxiliary>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
            />
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.AUTH.token != null
    }
};

export default connect(mapStateToProps)(Layout);