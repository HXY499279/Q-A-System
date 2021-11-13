import React, { Component } from 'react'

import{Route,Switch,Redirect} from 'react-router-dom'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

//?引入登录页面路由组件
import Login from './pages/login'

//?引入管理页面路由组件
import Admin from './pages/admin'
// import Admin from './pages/index'




//?在 App.js 里显示登录和管理页面的路由

export default class App extends Component {
        // //?关闭当前页面的时候退出登录
       
            // window.onunload=()=>{
            //      //?删除保存在 user 里的数据
            // storageUtils.removeUser();
            // memoryUtils.user = {}
            // //?跳转到 login 
            // this.props.history.replace('/login');
       
           
        // }
    render() {
        return (
            <div style={{height: "100%"}}>
                <Switch>
                    {/* <Route path="/login" component={Login}></Route> */}
                    <Route path="/admin" component={Admin}></Route>
                    <Redirect to="/admin"></Redirect>
                </Switch>
            </div>
        )
    }
}
