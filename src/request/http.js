import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';

axios.defaults.timeout = 10000;

function configInterceptors (instance) {
    instance.interceptors.request.use(
        (config) => {
            if(config.method.toLowerCase() === 'post') {
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            }
            return config;
        },
        error => {
            return Promise.error(error);
        }
    );
    instance.interceptors.response.use(
        response => {
            if (response.status === 200) {
                return Promise.resolve(response.data);
            } else {
                return Promise.reject(response);
            }
        },
        error => {
            console.log(error);
            return Promise.reject(error.response);
        }
    );
}


export function request (config) {
    const requester = axios.create();
    configInterceptors(requester);
    return requester.request(config);
}
