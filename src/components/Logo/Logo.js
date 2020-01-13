import React from 'react';

import burgerLogo from '../../assets/images/27.1 burger-logo.png.png'; //This is necessary as webpack during bundling will not be able to
                                                                        //find our image if path was passed to src of img tag directly. Passing it
                                                                        //dynamically will solve this issue.
import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.Logo}>
            <img src={burgerLogo} alt={"MyBurger"}/>
        </div>
    );
};

export default Logo;