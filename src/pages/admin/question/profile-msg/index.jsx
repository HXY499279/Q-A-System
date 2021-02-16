import React, { Component } from 'react'

import { Avatar, Image } from 'antd';

export default class ProfileMsg extends Component {
    render() {
        const profileBox = {
            display: 'flex',
            justifyContent: 'space-between'
        }
        return (
            <>
                <ul>
                    <li>
                    <Avatar
                    size={50}
                    src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    />
                    </li>
                </ul>
                <ul style={profileBox}>
                    <li>姓名：邱谦</li>
                    <li>角色：志愿者</li>
                    <li>学历：本科</li>
                    <li>学院：经济管理学院</li>
                </ul>
                <ul>
                    <li>个人简介：若大写字母开头，react就去渲染对应组件，若组件没有定义，则报错</li>
                    <li>成就：提问10次，回答5次，答案被采纳10次，答案被赞同10次，累计登录100次</li>
                    <li>积分：初出茅庐（996）</li>
                </ul>
            </>
        )
    }
}
