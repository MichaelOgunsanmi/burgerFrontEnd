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

            this.requestInterceptor = axios.interceptors.request.use( request => {
                this.setState({error: null});
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                response => response, err => {
                this.setState({error: err});
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor)
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


// import useHttpErrorHandler from "../../hooks/http-error-handler";
// const WithErrorHandler = (WrappedComponent, axios) => {
//     return props => {
//         const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
//
//         return (
//             <Auxiliary>
//                 <Modal
//                     show={error}
//                     modalClosed={errorConfirmedHandler}>
//                     {error ? error.message :  null}
//                 </Modal>
//                 <WrappedComponent {...props}/>
//             </Auxiliary>
//         );
//     }
//
// };