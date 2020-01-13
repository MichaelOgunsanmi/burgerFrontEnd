import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-f05dc.firebaseio.com/"
});

export default instance;