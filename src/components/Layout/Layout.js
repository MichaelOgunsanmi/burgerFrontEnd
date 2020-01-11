import React from "react";

import Auxiliary from "../../HigherOrderComponents/Auxillary";

import styles from './Layout.module.css';

const Layout = (props) => {
    return (

        <Auxiliary>
            <div>
                Main, SideBar , Backdrop
            </div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
};

export default Layout;