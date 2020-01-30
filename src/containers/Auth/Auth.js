import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import {auth, setAuthRedirectPath} from "../../store/actions";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import { updateObject, checkValidity } from "../../shared/utility";

import styles from './Auth.module.css'


class Auth extends Component {
    state = {
        controls:{
            email: this.inputConfig('input', 'email', 'Mail Address', '', {isEmail: true}),
            password: this.inputConfig('input', 'password', 'Password', '', {minLength: 6}),
        },
        isSignUp: true
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') this.props.onSetAuthRedirectPath()
    }


    inputConfig(elementType, type, placeholder, value, otherValidation){
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName] : updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();

        const {email, password} = this.state.controls;
        this.props.onAuth(email.value, password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls)
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType={'Success'}> SUBMIT </Button>
            </form>
        );

        if (this.props.loading) form = <Spinner/>;

        let errorMessage = null;

        if (this.props.error) errorMessage = <p>{this.props.error}</p>;

        let authRedirect = null;

        if (this.props.isAuthenticated) authRedirect = <Redirect to={this.props.authRedirectPath}/>;

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType={'Danger'}
                > SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'} </Button>
            </div>
        );
    }
}

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