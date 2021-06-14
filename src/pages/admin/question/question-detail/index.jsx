import React, { Component } from 'react'
import './index.less'
import { Avatar, Image } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import AdminTopbar from '../../../../components/admin-topbar'
import {qID} from '@/redux/store'
import {reqGetQuestionById,reqGetQuestionById2} from '@/api/index'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'
export default class QuestionDetail extends Component {
    state = {
        describes:null,
        questionDetail:[]
    }
    async componentDidMount () {
        const questionId = storageUtils.getQuestionId();
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
        const res2 = await reqGetQuestionById2(param)
        console.log(res2)
        this.setState({
            questionDetail:res2.data
        })
    }
    render() {
        const {describes} = this.state
        return (
            <div className="question-detail">
                <AdminTopbar tag="问题详情" timeShow="false"/>
                <div className="question-detail-content">
                    <h1 dangerouslySetInnerHTML = {{__html:describes}}></h1>
                    <hr/>
                    {
                        this.state.questionDetail.map(obj => {
                            return (
                                <div className="answers" key={obj.answerId}>
                                    <div className="answer-content">
                                        <Avatar
                                        size={60}
                                        src={<Image src={"https://xscqa.cqupt.edu.cn/question/img" + obj.userImg} />}
                                        />
                                        <ul className="answer-content-ul">
                                            <li>
                                                {obj.userName}
                                            </li>
                                            <li>
                                            
                                            <span> {obj.role == 1? "教师" : obj.role == 2 ? "志愿者" : obj.role == 3 ? "学生" : "管理员"  }</span>
                                            </li>
                                            <li>
                                                {obj.answerTime}
                                            </li>
                                        </ul>
                                        <ul>
                                            <span>回答：</span>
                                            <span dangerouslySetInnerHTML = {{__html:obj.content}}></span>
                                        </ul>
                                    </div>
                                    <hr/>
                                    {
                                        obj.comments.map((commentObj) => {
                                            return (
                                                <div className="comments" key={commentObj.commentId}>
                                                    <Avatar
                                                    size={40}
                                                    src={<Image src={"https://xscqa.cqupt.edu.cn/question/img" + commentObj.userImg}  />}
                                                    />
                                                    <ul className="comments-content-ul">
                                                        <li>
                                                            <span>{commentObj.userName}</span>
                                                        </li>
                                                        <li>
                                                        
                                                        <span> {commentObj.role == 1 ? "教师" : commentObj.role == 2 ? "志愿者" : commentObj.role == 3 ? "学生" : "管理员" }</span>
                                                        </li>
                                                        <li>
                                                            {commentObj.commentTime}
                                                        </li>
                                                    </ul>
                                                    <ul>
                                                        <span>评论内容：</span>
                                                        <span dangerouslySetInnerHTML = {{__html:commentObj.content}}></span></ul>
                                                </div>
                                                        )
                                                    })
                                                }
                                    <hr/>
                                        </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
