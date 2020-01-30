import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "../../../axios-orders";

import {purchaseBurger} from "../../../store/actions";

import WithErrorHandler from "../../../HigherOrderComponents/withErrorHandler/withErrorHandler";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import { updateObject, checkValidity } from "../../../shared/utility";

import styles from './ContactData.module.css'


class ContactData extends Component {
    state = {
        orderForm: {
            name: this.inputConfig('input', 'text', 'Your Name', ''),
            street: this.inputConfig('input', 'text', 'Street', ''),
            zipCode: {...this.inputConfig('input', 'text', 'ZIP Code', ''), validation: {required: true, minLength: 5, maxLength: 5, isNumeric: true}},
            country: this.inputConfig('input', 'text', 'Country', ''),
            email: {...this.inputConfig('input', 'email', 'Your E-mail', ''), validation: {required: true, isEmail: true}},
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
        },
        formIsValid: false
    };

    inputConfig(elementType, type, placeholder, value){
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true ;
        for (let inputIdentifier in updatedOrderForm)
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;


        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    orderHandler = async (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm)
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token)


    };


    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm)
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });

        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button btnType={'Success'} disabled={!this.state.formIsValid}> ORDER </Button>
            </form>
        );

        if (this.props.loading)
            form = <Spinner/>;
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

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