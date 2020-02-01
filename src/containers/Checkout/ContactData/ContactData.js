import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import axios from "../../../axios-orders";

import {purchaseBurger} from "../../../store/actions";

import WithErrorHandler from "../../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import { updateObject, checkValidity } from "../../../shared/utility";

import styles from './ContactData.module.css'


const ContactData = (props) => {
    const inputConfig = (elementType, type, placeholder, value) => {
        return {
            elementType,
            elementConfig: {
                type,
                placeholder
            },
            value,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    };

    const [orderForm, setOrderFormState] = useState({
            name: inputConfig('input', 'text', 'Your Name', ''),
            street: inputConfig('input', 'text', 'Street', ''),
            zipCode: {...inputConfig('input', 'text', 'ZIP Code', ''), validation: {required: true, minLength: 5, maxLength: 5, isNumeric: true}},
            country: inputConfig('input', 'text', 'Country', ''),
            email: {...inputConfig('input', 'email', 'Your E-mail', ''), validation: {required: true, isEmail: true}},
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        });

    const [formIsValid, setFormIsValidState] = useState(false);

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValidCheck = true ;
        for (let inputIdentifier in updatedOrderForm)
            formIsValidCheck = updatedOrderForm[inputIdentifier].valid && formIsValidCheck;

        setOrderFormState(updatedOrderForm);
        setFormIsValidState(formIsValidCheck);
    };

    const orderHandler = async (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm)
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token)
    };


    const formElementsArray = [];
    for (let key in orderForm)
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });

    let form = (
        <form onSubmit={orderHandler}>
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
            <Button btnType={'Success'} disabled={!formIsValid}> ORDER </Button>
        </form>
    );

    if (props.loading)
        form = <Spinner/>;
    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ingredients: state.BURGERBUILDER.ingredients,
        totalPrice: state.BURGERBUILDER.totalPrice,
        loading: state.ORDER.loading,
        token: state.AUTH.token,
        userId: state.AUTH.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));