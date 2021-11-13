import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import { Layout } from 'antd';
import './index.less'


import Header from "../../components/header";
import LeftNav from "../../components/left-nav";


import Home from './home'
import Question from './question'
import QuestionDetail from './question/question-detail'
import Message from './message'
import Subject from  './subject'
import Interface from './interface'
import User from './user'
import Feedback from './inform-feedback'
import Log from './the-log'
import Score from './score'
import Monitor from './monitor'
import MessageDetail from './message/message-detail';

//?引入存储模块
import memoryUtils from '@/utils/memoryUtils'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'


const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
      //?判断用户信息是否存储在内存中
      // const user = memoryUtils.user
      // if (!user.adminId) {
      //     return <Redirect to="/login"></Redirect>
      // }
        return (
            <Layout style={{minHeight:"100vh",minWidth:'1400px'}}>
            <Header/>
            <Layout>
              <Sider style={{backgroundColor: 'white'}} width="180"><LeftNav/></Sider>
              <Content style={{minHeight:"100%",minWidth:'1200px'}}>
                <Switch>
                  <Route path="/admin/home" component={Home}></Route>
                  <Route path="/admin/question" component={Question}></Route>
                  <Route path="/admin/questionDetail" component={QuestionDetail}></Route>
                  <Route path="/admin/message" component={Message}></Route>
                  <Route path="/admin/messageDetail" component={MessageDetail}></Route>
                  <Route path="/admin/subject" component={Subject}></Route>
                  <Route path="/admin/interface" component={Interface}></Route>
                  <Route path="/admin/user" component={User}></Route>
                  <Route path="/admin/feedback" component={Feedback}></Route>
                  <Route path="/admin/log" component={Log}></Route>
                  <Route path="/admin/score" component={Score}></Route>
                  {/* <Route path="/admin/monitor" component={Monitor}></Route> */}
                  <Redirect to="/admin/home"></Redirect>
                </Switch>                
              </Content>
            </Layout>
            <Footer style={{
              backgroundColor: '#30CB88', 
              color: '#ffffff',
              textAlign: 'center',
              marginBottom:"-20px"
          }}>重庆邮电大学学生处</Footer>
          </Layout>
        )
    }
}
