import React, { Component } from 'react'
import './index.less'
import { Avatar, Image } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import {reqGetFeedback} from '@/api/index'
import {feedbackIdStore} from '@/redux/store'
export default class FeedbackContent extends Component {
    state = {
        feedbackContent:null,
        feedbackImage:null,
        feedbackRole:null,
        feedbackTime:null,
        feedbackUserName:null
    }
    async componentDidMount () {
        const res = await reqGetFeedback({feedbackId:Number(feedbackIdStore.getState())})
        // console.log(res)
        const {feedbackContent,
                feedbackImage,
                feedbackRole,
                feedbackTime,
                feedbackUserName} = res.data
        this.setState({
                feedbackContent,
                feedbackImage,
                feedbackRole,
                feedbackTime,
                feedbackUserName
        })
        
    }
    render() {
        const {feedbackContent,
            feedbackImage,
            feedbackRole,
            feedbackTime,
            feedbackUserName} = this.state
        return (
                <div className="feedback-content">
                    {/* <Avatar
                    size={40}
                    src={<Image src={"http://202.202.43.250:8080/img"+feedbackImage} />}
                   /> */}
                    <ul className="feedback-content-ul">
                        <li>反馈者：
                            {feedbackUserName}
                        </li>
                        <li>
                            
                            <span> { feedbackRole == 1? "教师" : feedbackRole == 2 ? "志愿者" : feedbackRole == 3 ? "学生" : "管理员"}</span>
                            </li>
                        <li>
                            {feedbackTime}
                        </li>
                    </ul>
                    <ul>详情：{feedbackContent}</ul>
                    <img  src={"https://xscqa.cqupt.edu.cn/question/img"+feedbackImage } style={{width:"100%"}} alt="" />
               </div>
        )
    }
}
