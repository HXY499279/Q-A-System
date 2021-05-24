
//?能发送异步请求的 ajax (请求的函数模块)
//?封装 axios 库
//?函数的返回值是 promise 对象 

//?优化，进行统一处理错误信息

import { message } from 'antd';

import axios from 'axios'

//?引入qs，把 json 格式的参数转换为 form-data 格式
import qs from 'qs'

export default function ajax(url, params={}, type="GET") {

    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
    return new Promise((resolve,reject) => {
        let promise;        
        //?执行异步 ajax 请求
        if (type === "GET") {
            promise = axios.get(url,{
                params
            })
        } else  {
         //?把 json 格式的参数转换为 form-data 格式
         params = qs.stringify(params)
         promise = axios.post(url,params)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error(error.message);

        })
        
    })
   

}