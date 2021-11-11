import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/v1',
});

instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
    config.headers['Accept-Language'] = 'ar';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return config;
}, function (error) {
    console.log(error);
});

export default instance;
