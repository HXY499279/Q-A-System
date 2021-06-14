import React, { Component } from 'react'
import {logIdStore} from '@/redux/store' 
import {reqGetLogById} from '@/api/index'
export default class EditLog extends Component {
    state = {
        adminName:null,
        content:null,
        imgPath:null,
        ip:null,
        logTime:null,
        type:null,
    }
    async componentDidMount () {
        const res = await reqGetLogById({logId:Number(logIdStore.getState())})
        console.log(res)
        const {adminName,content,imgPath,ip,logTime,type} = res.data
        this.setState({
            adminName,
            content,
            imgPath,
            ip,
            logTime,
            type
        })
    }
    render() {
        const {adminName,content,imgPath,ip,logTime,type} = this.state
        return (
            <div>
                <ul>
                    <li>账户：{adminName}</li>
                    <li>动作：{type == 1 ? "增加" : type == 2 ? "删除" : type == 3 ? "修改" : "无" }</li>
                    <li><span>动作内容：</span><span dangerouslySetInnerHTML={{__html:content}}></span></li>
                    <img src={"https://xscqa.cqupt.edu.cn/question/"+imgPath}  />
                    <li>IP地址：{ip}</li>
                    <li>时间：{logTime}</li>
                </ul>
            </div>
        )
    }
}
