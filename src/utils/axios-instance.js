import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://beautypoint.sa/api/v1',
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default instance;