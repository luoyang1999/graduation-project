import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;

const download = (url, resOpts = {}) => {
    const { type = 'get', data = '' } = resOpts
    const queryArgs = {
        url,
        method: type,
        data,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            withCredentials: true,
        },
    }
    // tips: 这里直接返回的是response整体!
    return axios.request(queryArgs).catch(err => console.log(err))
}

