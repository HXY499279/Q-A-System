import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import { Layout } from 'antd';


import Header from "../../components/header";
import LeftNav from "../../components/left-nav";


import Home from './home'
import Question from './question'
import Message from './meaasge'
import Subject from  './subject'
import Interface from './interface'
import User from './user'
import Feedback from './feedback'
import Monitor from './monitor'
const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight:"100%"}}>
            <Header/>
            <Layout>
              <Sider style={{backgroundColor: 'white'}} width="180"><LeftNav/></Sider>
              <Content>
                <Switch>
                  <Route path="/admin/home" component={Home}></Route>
                  <Route path="/admin/question" component={Question}></Route>
                  <Route path="/admin/message" component={Message}></Route>
                  <Route path="/admin/subject" component={Subject}></Route>
                  <Route path="/admin/interface" component={Interface}></Route>
                  <Route path="/admin/user" component={User}></Route>
                  <Route path="/admin/feedback" component={Feedback}></Route>
                  <Route path="/admin/monitor" component={Monitor}></Route>
                  <Redirect to="/admin/home"></Redirect>
                </Switch>                
              </Content>
            </Layout>
            <Footer style={{backgroundColor: '#30CB88', color: '#FFFFFF',textAlign: 'center'}}>Made by MisLab in CQUPT</Footer>
          </Layout>
        )
    }
}