import React, { Component } from 'react'

import{Route,Switch,Redirect} from 'react-router-dom'

//?引入登录页面路由组件
import Login from './pages/login'

//?引入管理页面路由组件
import Admin from './pages/admin'



//?在 App.js 里显示登录和管理页面的路由

export default class App extends Component {
    render() {
        return (
            <div style={{height: "100%"}}>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
                
            </div>
        )
    }
}
