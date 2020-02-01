import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import {auth, setAuthRedirectPath} from "../../store/actions";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { updateObject, checkValidity } from "../../shared/utility";

import styles from './Auth.module.css'


const Auth = props => {
    const inputConfig = (elementType, type, placeholder, value, otherValidation) => {
        return {
            elementType,
            elementConfig: {
                type,
                placeholder
            },
            value,
            validation: {
                required: true,
                ...otherValidation
            },
            valid: false,
            touched: false
        }
    };

    const [controls, setControlsState] = useState({
        email: inputConfig('input', 'email', 'Mail Address', '', {isEmail: true}),
        password: inputConfig('input', 'password', 'Password', '', {minLength: 6}),
    });

    const [isSignUp, setIsSignUpState] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') props.onSetAuthRedirectPath()
    }, []);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName] : updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        setControlsState(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const {email, password} = controls;
        props.onAuth(email.value, password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUpState(!isSignUp)
    };

    const formElementsArray = [];
    for (let key in controls)
        formElementsArray.push({
            id: key,
            config: controls[key]
        });

    let form = (
        <form onSubmit={submitHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType={'Success'}> SUBMIT </Button>
        </form>
    );

    if (props.loading) form = <Spinner/>;

    let errorMessage = null;

    if (props.error) errorMessage = <p>{props.error}</p>;

    let authRedirect = null;

    if (props.isAuthenticated) authRedirect = <Redirect to={props.authRedirectPath}/>;

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button
                clicked={switchAuthModeHandler}
                btnType={'Danger'}
            > SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'} </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.AUTH.loading,
        error: state.AUTH.error,
        isAuthenticated: state.AUTH.token !== null,
        buildingBurger: state.BURGERBUILDER.building,
        authRedirectPath: state.AUTH.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);