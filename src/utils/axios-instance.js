import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://beautypoint.sa/api/v1',
});

export default instance;