import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from "../../../axios-orders";


import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import styles from './ContactData.module.css'


class ContactData extends Component {
    state = {
        orderForm: {
            name: this.inputConfig('input', 'text', 'Your Name', ''),
            street: this.inputConfig('input', 'text', 'Street', ''),
            zipCode: {...this.inputConfig('input', 'text', 'ZIP Code', ''), validation: {required: true, minLength: 5, maxLength: 5}},
            country: this.inputConfig('input', 'text', 'Country', ''),
            email: this.inputConfig('input', 'email', 'Your E-mail', ''),
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
        formIsValid: false,
        loading: false
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

    checkValidity(value, rules){
        let isValid = true;

        if (!rules) return isValid;

        if (rules.required) isValid = value.trim() !== '' && isValid;

        if (rules.minLength) isValid = value.length >= rules.minLength && isValid;

        if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

        return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true ;
        for (let inputIdentifier in updatedOrderForm)
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;


        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    orderHandler = async (event) => {
        event.preventDefault();
        this.setState({loading: true});

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm)
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };

        await axios.post('/orders.json', order);

        this.setState({loading: false});
        this.props.history.push('/');

        console.log(this.props.ingredients)
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

        if (this.state.loading)
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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);