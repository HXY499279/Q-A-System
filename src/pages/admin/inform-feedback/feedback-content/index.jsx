import React, { Component } from 'react'
import './index.less'
import { Avatar, Image } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
export default class FeedbackContent extends Component {
    render() {
        return (
                <div className="feedback-content">
                    <Avatar
                    size={40}
                    src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                   />
                    <ul className="feedback-content-ul">
                        <li>
                            aqiuya
                        </li>
                        <li>
                            <CrownOutlined style={{color:"#30CB88"}}/>
                            <span> 志愿者</span>
                            </li>
                        <li>
                            2020-11-12 16:00
                        </li>
                    </ul>
                    <ul>详情：这里是反馈详情这里是反馈详情这里是反馈详情这里是反馈详情这里是反馈详情这里是反馈详情这里是反馈详情</ul>
               </div>
        )
    }
}
