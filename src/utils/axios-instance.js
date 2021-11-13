import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://beautypoint.sa/api/v1',
});

//instance.defaults.withCredentials = true;
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['Accept-Language'] = 'ar';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    token !== null ? config.headers['Authorization'] = 'Bearer ' + token : console.log(token);
    return config;
}, function (error) {
    console.log(error.message);
});

export default instance;
