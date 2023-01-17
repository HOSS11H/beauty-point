import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.beautypoint.sa/api/v2',
});

instance.interceptors.request.use(function (config) {
    let token =  localStorage.getItem('token');
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] =token !== null ? 'Bearer ' + token : null;
    return config;
}, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    }
});

/* instance.interceptors.response.use(undefined
, function (error) {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    }
}); */

export default instance;
