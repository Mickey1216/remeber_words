//当前这个模块的作用：对API进行统一管理
import requests from './request'

//登录  URL:/api/user/login  请求方式：post 参数：username，password
export const reqUserLogin = (data)=> requests({url:'/user/login',data,method:'post'})