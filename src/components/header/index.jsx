import React, { Component } from 'react'

//?把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
import { withRouter } from "react-router-dom";

import './index.less'

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
const { confirm } = Modal;

class Header extends Component {
    confirmOut = ()=> {
        confirm({
            title: '你确定退出登录吗？',
            icon: <ExclamationCircleOutlined />,
            onOk : ()=> {
                //?删除保存在 user 里的数据
                storageUtils.removeUser();
                memoryUtils.user = {}
                
                //?跳转到 login 
                this.props.history.replace('/login');
            },
          });
    }

    render() {
        return (
            <div className="header">
                <div className="header-left">
                    <h1>邮问必答重邮学业辅导中心</h1>
                    <span>后台管理系统</span>
                </div>
                <div className="header-right">
                    <span>admin</span>
                    <span> | </span>
                    <a onClick={this.confirmOut} href="#">退出</a>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)