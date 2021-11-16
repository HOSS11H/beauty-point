import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://beautypoint.sa/api/v1',
});

//instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
}, function (error) {
    console.log(error.message);
});

export default instance;
