// //*后台管理的登录路由组件
// import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";
// //?引入样式文件
// import './index.less'

// //?引入 antd 组件
// import { 
//     Card,
//     Form, 
//     Input, 
//     Button,
//     message
//  } from "antd"
//  import { UserOutlined, LockOutlined } from '@ant-design/icons';

// //?引入图片
// import logo from './image/logo_bg.jpg'

// //?引入请求函数
// import {reqLogin} from '@/api/index'

// //?引入存储模块
// import memoryUtils from '@/utils/memoryUtils'
// //?引入localstorage模块
// import storageUtils from '@/utils/storageUtils'

// const gridStyle = {
//     width: '100%',
//     textAlign: 'center',
// };

// export default class Login extends Component {
//     state = {
//         loginLink:null
//     }
//     componentDidMount(){
//         reqLogin()
//         .then(res=>{
//             // console.log("aa2343aaa")
//             console.log(res.data)
//             // window.location.href=`${res.data}`
//             this.setState({
//                 loginLink:res.data + ''
//             })
//             //  let e = this.state.loginLink instanceof string
//             //  console.log(e)
//              console.log(typeof(this.state.loginLink))
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }
    


//     jumpPreviewPage() {
        
//         // console.log(this.state.loginLink)
//         // const w=window.open('about:blank');
//         window.location.href='https://ids.cqupt.edu.cn:443/authserver/login?service=https%3A%2F%2Fxscqa.cqupt.edu.cn%3A443%2Fquestion%2FadminCasLogin'
//         // window.open( "https://ids.cqupt.edu.cn:443/authserver/login")
//         // window.open("https://www.baidu.com")
       
//       }
//       render() {
//         //?判断用户信息是否存储在内存中
//         // const user = memoryUtils.user
//         // if (user.adminId) {
//         //     return <Redirect to="/admin/home"></Redirect>
//         // }


//         return (

//             <div className="login">
//                 <div className="login-header">
//                     <img src={logo} alt="图片"/>
//                     <h1>后台管理系统</h1>
//                 </div>
//                 <div className="login-content">
//                         <Button onClick={this.jumpPreviewPage}>
//                             去登录
//                         </Button>             
//                 </div>
                 
//             </div>
//         )
//     }
// }




//*后台管理的登录路由组件
import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
//?引入样式文件
import './index.less'

//?引入 antd 组件
import { 
    Card,
    Form, 
    Input, 
    Button,
    message
 } from "antd"
 import { UserOutlined, LockOutlined } from '@ant-design/icons';

//?引入图片
import logo from './image/logo_bg.jpg'

//?引入请求函数
import {reqLogin} from '@/api/index'

//?引入存储模块
import memoryUtils from '@/utils/memoryUtils'
//?引入localstorage模块
import storageUtils from '@/utils/storageUtils'

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

export default class Login extends Component {

    loginSubmit = async (values) => {
            const {adminId,password} = values;
            let param = {
                adminId,
                password
            }
        
            const result = await reqLogin(param);
            
            console.log(result);
            const {code} = result;
            if(code == 1){
                const user = result.data;
                //?保存用户登录信息到内存中
                memoryUtils.user = user;

                //?保存用户登录信息到localstorage
                storageUtils.saveUser(user)
                message.success("登录成功");

                //?登录成功之后跳转路由
                this.props.history.replace('/admin');
            }else{
                message.error("登录失败，请重新登录");
            }
            
      }

      render() {
        //?判断用户信息是否存储在内存中
        const user = memoryUtils.user
        if (user.adminId) {
            return <Redirect to="/admin/home"></Redirect>
        }
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="图片"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <Card.Grid className="login-box" style={gridStyle}>
                        <h2>用户登录</h2>
                        <Form
                            onSubmit={this.handleSubmit}
                            name="normal_login"
                            className="login-form"
                            onFinish={this.loginSubmit}
                            initialValues={{ remember: true }}
                            >
                            <Form.Item
                                name="adminId"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="Username" 
                                autoComplete='username'
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                autoComplete='password'
                                />
                            </Form.Item>
                            
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                                </Button> 
                            </Form.Item>
                         </Form>
                    </Card.Grid>
                </div>
                 
            </div>
        )
    }
}
