import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://testbeauty.beautypoint.sa/api/v2',
});
const token =  localStorage.getItem('token');
instance.interceptors.request.use(function (config) {
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] =token !== null ? 'Bearer ' + token : null;
    return config;
}, function (error) {
    console.log(error.message);
});

export default instance;
