import React from "react";

import Auxiliary from "../../HigherOrderComponents/Auxillary";
import Toolbar from "../Navigation/Toolbar/Toolbar";

import styles from './Layout.module.css';

const Layout = (props) => {
    return (

        <Auxiliary>
            <Toolbar/>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;