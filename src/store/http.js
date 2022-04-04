import axios from 'axios';

// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
instance.defaults.baseURL = 'http://localhost:9090'
instance.interceptors.request.use(
  config => {
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      // console.log('请求头加入token')
      config.headers.Authorization = 'Bearer ' + localStorage.getItem("token");
    }

    return config

  },

  error => {
    console.log('请求失败！！')
    console.log(error)
    return Promise.reject(error)

  })

//异步请求后，判断token是否过期
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          this.$router.push('/');
      }
    }
  }
)
export default instance;