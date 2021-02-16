
//?能发送异步请求的 ajax (请求的函数模块)
//?封装 axios 库
//?函数的返回值是 promise 对象 

//?优化，进行统一处理错误信息

import { message } from 'antd';

import axios from 'axios'

export default function ajax(url, params={}, type="GET") {
  
    return new Promise((resolve,reject) => {
        let promise;

        //?执行异步 ajax 请求
        if (type === "GET") {
            promise = axios.get(url,{
                params
            })
        } else  {
            promise = axios.post(url,params)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error(error.message);

        })
        
    })
   

}