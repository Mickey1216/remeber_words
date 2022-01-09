//对于axiso进行二次封装
import axios from 'axios'

//1.利用axios对象的方法create，去创建一个axios对象
//2.requests就是axios，只不过要稍微配置一下
const requests = axios.create({
    //基础路径，发请求的时候，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间5s
    timeout: 5000
})

//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送出去前做一些事情
requests.interceptors.request.use((config) => {  //config：配置对象，对象里面有一个属性很重要，header请求头
    return config
})

//响应拦截器：
requests.interceptors.response.use((res) => { //res：成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (error) => {   //error：失败的回调函数
    return Promise.reject(new Error('failure'))
})

//对外暴露
export default requests