import React, { Component } from 'react'
import './index.less'
import { Avatar, Image } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import AdminTopbar from '../../../../components/admin-topbar'
import {qID} from '@/redux/store'
import {reqGetQuestionById} from '@/api/index'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
export default class QuestionDetail extends Component {
    state = {
        describes:null,
        questionDetail:[
            {
                id: '01',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                name: '邱谦',
                identity: '志愿者',
                time: '2002-11-12 16:00',
                content: '我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答',
                img: '',
                comments:[
                    {
                        id: '001',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: '邱谦1',
                        identity: '志愿者',
                        time: '2002-11-12 16:00',
                        content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    },
                    {
                        id: '002',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: '邱谦2',
                        identity: '志愿者',
                        time: '2002-11-12 16:00',
                        content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    },
                    {
                        id: '003',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        name: '邱谦3',
                        identity: '志愿者',
                        time: '2002-11-12 16:00',
                        content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    }
                    

                ]
                },
             
                    // {
                    //     id: '03',
                    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    //     name: '邱谦',
                    //     identity: '志愿者',
                    //     time: '2002-11-12 16:00',
                    //     content: '我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答我是回答',
                    //     img: '',
                    //     comments:[
                    //         {
                    //             id: '01',
                    //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    //             name: '邱谦',
                    //             identity: '志愿者',
                    //             time: '2002-11-12 16:00',
                    //             content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    //         },
                    //         {
                    //             id: '02',
                    //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    //             name: '邱谦',
                    //             identity: '志愿者',
                    //             time: '2002-11-12 16:00',
                    //             content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    //         },
                    //         {
                    //             id: '03',
                    //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    //             name: '邱谦',
                    //             identity: '志愿者',
                    //             time: '2002-11-12 16:00',
                    //             content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
                    //         }
                    //     ]
                    //     }
        ]
    }
    async componentDidMount () {
        const questionId = qID.getState();
        console.log("问题id")
        console.log(questionId)
        let accountId = storageUtils.getUser().adminId;
        let param = {
            questionId,
            accountId
        }
        const res = await reqGetQuestionById(param)
        console.log(res)
        let {describes} = res.data
        this.setState({
            describes
        })

        
    }
    render() {
        const {describes} = this.state
        return (
            <div className="question-detail">
                <AdminTopbar tag="问题详情" timeShow="false"/>
                <div className="question-detail-content">
                    <h1>{describes}</h1>
                    <hr/>
                    {
                        this.state.questionDetail.map(obj => {
                            return (
                                <div className="answers" key={obj.id}>
                                    <div className="answer-content">
                                        <Avatar
                                        size={60}
                                        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        />
                                        <ul className="answer-content-ul">
                                            <li>
                                                {obj.name}
                                            </li>
                                            <li>
                                            <CrownOutlined style={{color:"#30CB88"}}/>
                                            <span> {obj.identity}</span>
                                            </li>
                                            <li>
                                                {obj.time}
                                            </li>
                                        </ul>
                                        <ul>回答：{obj.content}</ul>
                                    </div>
                                    <hr/>
                                    {
                                        obj.comments.map((commentObj) => {
                                            return (
                                                <div className="comments" key={commentObj.id}>
                                                    <Avatar
                                                    size={40}
                                                    src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    />
                                                    <ul className="comments-content-ul">
                                                        <li>
                                                            <span>{commentObj.name}</span>
                                                        </li>
                                                        <li>
                                                        <CrownOutlined style={{color:"#30CB88"}}/>
                                                        <span> {commentObj.identity}</span>
                                                        </li>
                                                        <li>
                                                            {commentObj.time}
                                                        </li>
                                                    </ul>
                                                    <ul>评论内容：{commentObj.content}</ul>
                                                </div>
                                                        )
                                                    })
                                                }
                                        </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
