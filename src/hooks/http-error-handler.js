import React, {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setErrorState] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use( request => {
        setErrorState( null);
        return request;
    });

    const responseInterceptor = httpClient.interceptors.response.use(
        response => response, err => {
            setErrorState( err);
        });


    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor)
        }
    }, [requestInterceptor, responseInterceptor]);


    const errorConfirmedHandler = () => {
        setErrorState( null);
    };

    return [error, errorConfirmedHandler]
}