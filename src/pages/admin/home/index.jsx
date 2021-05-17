import React, { Component } from 'react'
import { Layout } from 'antd';

import SumCard from './sum-card'
import EChart from './eChart'
import HomeList from './home-list'
import './index.less'



const { Header, Footer, Sider, Content } = Layout;



export default class Home extends Component {
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
