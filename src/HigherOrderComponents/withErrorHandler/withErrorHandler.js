import React, {Component} from 'react';

import Auxiliary from "../Auxillary/Auxillary";
import Modal from "../../components/UI/Modal/Modal";

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            error: null
        };

        responseInterceptor;
        requestInterceptor;

        constructor(props, ) {
            super(props);

            this.responseInterceptor = axios.interceptors.response.use( request => {
                this.setState({error: null});
                return request;
            });

            this.requestInterceptor = axios.interceptors.response.use(
                response => {
                if (response.data === null){
                    Promise.reject(response);
                    return;
                }

                return response
                },
                    error => {
                this.setState({error: error});

            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor)
        }


        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message :  null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
};

export default WithErrorHandler;