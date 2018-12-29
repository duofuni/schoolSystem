import axios from 'axios'
axios.interceptors.request.use(
    (config) => {
        const x_access_token = sessionStorage.getItem('x_access_token');
        if (x_access_token) { // 有token时
            config.headers['x_access_token'] = x_access_token; // 给请求头加token
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);
  
axios.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.status == 401) { // 没有token
            sessionStorage.removeItem('x_access_token');
            // console.log(res.msg);
            this.$router.push('/login');
        } else {
            return response.data;
        };
    },
    error => {
        const {status} = error.response || {};
        switch (+status) {
            case 401:
                sessionStorage.removeItem('x_access_token');
                return this.$router.push('/login');
            default:
                Promise.reject(error);
        };
    }
);

export default axios;
