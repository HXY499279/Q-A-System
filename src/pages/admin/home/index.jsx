import React, { Component } from 'react'
import { Layout } from 'antd';

import SumCard from './sum-card'
import EChart from './eChart'
import HomeList from './home-list'
import './index.less'
import {reqLoginInfo} from '@/api/index'

//?引入存储模块
import memoryUtils from '@/utils/memoryUtils'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'


const { Header, Content } = Layout;



export default class Home extends Component {
  componentDidMount(){
   
    

  }
  render() {
    return (
      <Layout>
        <Header className="admin-home-header"><SumCard/></Header>
        <Content className="admin-home-content">
          <EChart/>
        </Content>
        <Content className="admin-home-content">
          <HomeList/>
        </Content>
      </Layout>
    )
  }
}
